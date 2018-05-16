package net.timesheet.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class TimeSheet extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	@OneToMany
	private Set<Approval> approvals;
	@OneToMany
	private Set<TimeEntry> entries;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Enumerated(EnumType.STRING)
	private TimeSheetStatus status;

	public Set<Approval> getApprovals() {
		return approvals;
	}

	public Set<TimeEntry> getEntries() {
		return entries;
	}

	public Long getId() {
		return id;
	}

	public TimeSheetStatus getStatus() {
		return status;
	}

	public void setApprovals(Set<Approval> approvals) {
		this.approvals = approvals;
	}

	public void setEntries(Set<TimeEntry> entries) {
		this.entries = entries;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setStatus(TimeSheetStatus status) {
		this.status = status;
	}
}
