package net.timesheet.dto;

import java.io.Serializable;
import java.util.List;

import net.timesheet.entity.Assignment;
import net.timesheet.entity.TimeEntry;
import net.timesheet.entity.TimeSheet;

/**
 * data transfer object
 * @author huoshan
 * created by 2018年5月17日 下午12:03:03
 * 
 */
public class TimeSheetDTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public TimeSheet timesheet;
	public Assignment assignment;
	public TimeEntry[] list = new TimeEntry[7];
	
	public TimeSheet getTimesheet() {
		return timesheet;
	}
	public void setTimesheet(TimeSheet timesheet) {
		this.timesheet = timesheet;
	}
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}
	public TimeEntry[] getList() {
		return list;
	}
	public void setList(TimeEntry[] list) {
		this.list = list;
	}
	
	@Override
	public String toString() {
		return "TimeSheetDTO [timesheet=" + timesheet + ", assignment=" + assignment + ", list=" + list + "]";
	}
	
}
