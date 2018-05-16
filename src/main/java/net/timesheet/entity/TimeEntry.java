package net.timesheet.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class TimeEntry extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	@OneToOne
	private Assignment assignment;
	private Date date;
	private int hours;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String note;

	public Assignment getAssignment() {
		return assignment;
	}

	public Date getDate() {
		return date;
	}

	public int getHours() {
		return hours;
	}

	public Long getId() {
		return id;
	}

	public String getNote() {
		return note;
	}

	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setHours(int hours) {
		this.hours = hours;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNote(String note) {
		this.note = note;
	}

}
