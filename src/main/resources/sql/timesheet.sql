
CREATE TABLE `time_sheet` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1


CREATE TABLE `time_entry` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `date` date DEFAULT NULL,
  `hours` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `assignment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlnm7frc7ahpv5mv1ohokrayxr` (`assignment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1


CREATE TABLE `time_sheet_approvals` (
  `time_sheet_id` bigint(20) NOT NULL,
  `approvals_id` bigint(20) NOT NULL,
  PRIMARY KEY (`time_sheet_id`,`approvals_id`),
  UNIQUE KEY `UK_ghbab6w2fp3e88ej6qh5yb8vk` (`approvals_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1


CREATE TABLE `time_sheet_entries` (
  `time_sheet_id` bigint(20) NOT NULL,
  `entries_id` bigint(20) NOT NULL,
  PRIMARY KEY (`time_sheet_id`,`entries_id`),
  UNIQUE KEY `UK_ksr59v3va97kso5rrkkr367ve` (`entries_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1