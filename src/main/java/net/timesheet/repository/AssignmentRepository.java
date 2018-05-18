package net.timesheet.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.timesheet.entity.Assignment;
import net.timesheet.entity.TimeEntry;


/**
 * @author huoshan
 * created by 2018年5月17日 下午2:22:12
 * 
 */
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
	
}

