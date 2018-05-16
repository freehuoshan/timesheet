package net.timesheet.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Approval extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Date date;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String note;

	public Date getDate() {
		return date;
	}

	public Long getId() {
		return id;
	}

	public String getNote() {
		return note;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setNote(String note) {
		this.note = note;
	}

}
