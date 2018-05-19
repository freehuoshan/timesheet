package net.timesheet.service.impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.timesheet.dto.TimeSheetDTO;
import net.timesheet.entity.Assignment;
import net.timesheet.entity.TimeEntry;
import net.timesheet.entity.TimeSheet;
import net.timesheet.entity.TimeSheetStatus;
import net.timesheet.repository.AssignmentRepository;
import net.timesheet.repository.TimeEntryRepository;
import net.timesheet.repository.TimeSheetRepository;
import net.timesheet.service.TimeSheetService;

/**
 * @author huoshan
 * created by 2018年5月17日 下午2:18:17
 */
@Transactional
@Service("timeSheetService")
public class TimeSheetServiceImpl implements TimeSheetService {
	
	@Autowired
	private TimeEntryRepository timeEntryRepository;
	
	@Autowired
	private TimeSheetRepository timeSheetRepository;
	
	@Autowired
	private AssignmentRepository assignmentRepository;

	/* (non-Javadoc)
	 * @see net.timesheet.service.TimeSheetService#getTimeSheet(java.lang.String, java.lang.String)
	 */
	@Override
	public List<TimeSheetDTO> getTimeSheet(String beginTime, String endTime) throws Exception {
		DateFormat fmt =new SimpleDateFormat("yyyy-MM-dd");
		List<String> weekTimeList = getTimeArr(beginTime);
		//find timeentry depend week time period
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDate = dateFormat.parse(beginTime);
		Date endDate = dateFormat.parse(endTime);
		List<TimeEntry> timeEntrys = timeEntryRepository.findByDateBetween(beginDate, endDate);
		if(timeEntrys == null || timeEntrys.size() == 0){
			return null;
		}
		//get timesheet
		Long timeEntryId = timeEntrys.get(0).getId();
		TimeSheet sheet = timeSheetRepository.findByEntriesId(timeEntryId);
		//get assignment list
		List<Long> assignmentIds = new ArrayList<>();
		Map<Long, Assignment> mapAssignment = new HashMap<>();
		Set<TimeEntry> entries = sheet.getEntries();
		for (TimeEntry timeEntry : entries) {
			if(!assignmentIds.contains(timeEntry.getAssignment().getId())){
				assignmentIds.add(timeEntry.getAssignment().getId());
				mapAssignment.put(timeEntry.getAssignment().getId(), timeEntry.getAssignment());
			}
		}
		//loop assignments
		List<TimeSheetDTO> listTimeSheet = new ArrayList<>();
		for(Long assignmentId : assignmentIds){
			TimeSheetDTO dto = new TimeSheetDTO();
			TimeEntry[] assignmentTimeEntries = new TimeEntry[7];
			for (TimeEntry timeEntry : entries) {
				if(timeEntry.getAssignment().getId().equals(assignmentId)){
						dto.setAssignment(timeEntry.getAssignment());
						
						int index = weekTimeList.indexOf(fmt.format(timeEntry.getDate()));
						assignmentTimeEntries[index] = timeEntry;
				}
			}
			for(int i = 0; i < assignmentTimeEntries.length; i++){
				TimeEntry timeEntry = assignmentTimeEntries[i];
				if(timeEntry == null){
					TimeEntry blank = new TimeEntry();
					java.sql.Date sqlDate = new java.sql.Date(fmt.parse(weekTimeList.get(i)).getTime());
					blank.setDate(sqlDate);
					blank.setHours(0);
					blank.setAssignment(mapAssignment.get(assignmentId));
					assignmentTimeEntries[i] = blank;
				}
			}
			dto.setList(assignmentTimeEntries);
			dto.setTimesheet(sheet);
			listTimeSheet.add(dto);
		}
		return listTimeSheet;
	}
	
	public List<String> getTimeArr(String source) throws Exception{
		
		List<String> timeList = new ArrayList<>();
		timeList.add(source);
		for(int i=1; i< 7; i++){
			DateFormat fmt =new SimpleDateFormat("yyyy-MM-dd");
			Date date = fmt.parse(source);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DAY_OF_YEAR, 1);
			date = calendar.getTime();
			source = fmt.format(date);
			timeList.add(source);
		}
		
		return timeList;
	}

	/* (non-Javadoc)
	 * @see net.timesheet.service.TimeSheetService#updateTimeEntry(net.timesheet.entity.TimeEntry)
	 */
	@Override
	public Map<String, Boolean> updateTimeEntry(TimeEntry timeEntry, Long sheetId) {
		Assignment assignment = this.assignmentRepository.getOne(timeEntry.getAssignment().getId());
		timeEntry.setAssignment(assignment);
		TimeSheet timeSheet = this.timeSheetRepository.getOne(sheetId);
		Boolean res = false;
		if(timeEntry.getId() == null){
			timeEntry.setCreatedBy("123");
			timeEntry.setLastModifiedBy("123");
			TimeEntry timeEntrySave = this.timeEntryRepository.save(timeEntry);
			timeSheet.getEntries().add(timeEntrySave);
			this.timeSheetRepository.save(timeSheet);
			res = true;
		}else{
			TimeEntry existTimeEntry = this.timeEntryRepository.getOne(timeEntry.getId());
			existTimeEntry.setHours(timeEntry.getHours());
			this.timeEntryRepository.save(existTimeEntry);
			res = true;
		}
		Map<String,Boolean> resultMap = new HashMap<>();
		resultMap.put("result", res);
		return resultMap;
	}

	/* (non-Javadoc)
	 * @see net.timesheet.service.TimeSheetService#submit(java.lang.Long)
	 */
	@Override
	public Map<String, Boolean> submit(Long id) {
		TimeSheet timesheet = this.timeSheetRepository.getOne(id);
		timesheet.setStatus(TimeSheetStatus.SUBMITTED);
		this.timeSheetRepository.save(timesheet);
		Map<String, Boolean> resMap = new HashMap<>();
		resMap.put("result", true);
		return resMap;
	}

	/* (non-Javadoc)
	 * @see net.timesheet.service.TimeSheetService#note(net.timesheet.entity.TimeEntry)
	 */
	@Override
	public Map<String, Boolean> note(TimeEntry timeEntry) {
		TimeEntry existTimeEntry = this.timeEntryRepository.getOne(timeEntry.getId());
		existTimeEntry.setNote(timeEntry.getNote());
		this.timeEntryRepository.save(existTimeEntry);
		Map<String, Boolean> resultMap = new HashMap<>();
		resultMap.put("result", true);
		return resultMap;
	}

}
