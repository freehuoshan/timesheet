package net.timesheet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import net.timesheet.entity.TimeSheet;


/**
 * @author huoshan
 * created by 2018年5月17日 下午2:22:12
 * 
 */
public interface TimeSheetRepository extends JpaRepository<TimeSheet, Long> {
	
	TimeSheet findByEntriesId(Long entryId);
}

