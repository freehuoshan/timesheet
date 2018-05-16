package net.timesheet.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Assignment extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	private boolean active;
	private Date endDate;
	private int hourlyRate;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private Date startDate;

	public Date getEndDate() {
		return endDate;
	}


	public Long getId() {
		return id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}


	public int getHourlyRate() {
		return hourlyRate;
	}


	public void setHourlyRate(int hourlyRate) {
		this.hourlyRate = hourlyRate;
	}
}
