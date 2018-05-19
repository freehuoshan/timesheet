package net.timesheet.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.timesheet.dto.TimeSheetDTO;
import net.timesheet.entity.Assignment;
import net.timesheet.entity.TimeEntry;
import net.timesheet.service.TimeSheetService;

/**
 * @author huoshan
 * created by 2018年5月14日 下午3:27:52
 * 
 */
@Controller
public class TimeSheetController {
	
	@Autowired
	private TimeSheetService timeSheetService;
	
	
	@RequestMapping("/")
	public String index(Map<String, Object> map){
		return "index";
	}
	
	@RequestMapping(value = "/timesheet")
	@ResponseBody
	public List<TimeSheetDTO> getTimeSheet(@RequestParam(value = "beginTime", required = true) String beginTime,
			@RequestParam(value = "endTime", required = true) String endTime) throws Exception{
		return timeSheetService.getTimeSheet(beginTime, endTime);
	}
	
	@RequestMapping(value = "/time_entry/update", method = RequestMethod.PUT)
	@ResponseBody
	public Map<String, Boolean> updateTimeEntry(Integer hours, 
			String id, String date, Long asid, Long sheetId) throws Exception{
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		TimeEntry timeEntry = new TimeEntry();
		timeEntry.setHours(hours);
		java.sql.Date sqlDate = new java.sql.Date(fmt.parse(date).getTime());
		timeEntry.setDate(sqlDate);
		if("null".equals(id) || id == null){
			timeEntry.setId(null);
		}else{
			timeEntry.setId(new Long(id));
		}
		Assignment asignment = new Assignment();
		asignment.setId(asid);
		timeEntry.setAssignment(asignment);
		return timeSheetService.updateTimeEntry(timeEntry, sheetId);
	}
	
	@RequestMapping(value = "/submit", method = RequestMethod.PUT)
	@ResponseBody
	public Map<String, Boolean> submit(Long id){
		return this.timeSheetService.submit(id);
	}
	
	@RequestMapping(value = "/time_entry/note", method = RequestMethod.PUT)
	@ResponseBody
	public Map<String, Boolean> updateTimeEntry(TimeEntry timeEntry) throws Exception{
		
		return this.timeSheetService.note(timeEntry);
	}
}
