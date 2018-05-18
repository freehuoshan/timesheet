package net.timesheet.service;

import java.util.List;
import java.util.Map;

import net.timesheet.dto.TimeSheetDTO;
import net.timesheet.entity.TimeEntry;

/**
 * @author huoshan
 * created by 2018年5月17日 下午2:15:10
 * 
 */
public interface TimeSheetService {
	
	public List<TimeSheetDTO> getTimeSheet(String beginTime, String endTime) throws Exception;

	/**
	 * @param timeEntry
	 * @return
	 */
	public Map<String, Boolean> updateTimeEntry(TimeEntry timeEntry, Long sheetId);

	/**
	 * @param id
	 * @return
	 */
	public Map<String, Boolean> submit(Long id);
	
}
