<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html lang="en">
	<head>
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.css">
		<link href="css/timesheet.css" rel="stylesheet"/>
		
		<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script> 
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/bootstrap-table.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/editable/bootstrap-table-editable.js"></script>
		<script src="js/timesheet.js"></script>
	</head>
	<body>
	
	  <table class="table">
		<tr>
		  <td class="fa fa-chevron-left" id="reduce"></td>
		  <td id="leftMonth" class="active" >
		  	<div>APRIAL</div>
		  	<div>
		  	</div>
		  </td>
		  <td id="centerMonth" class="success" >
		  	<div>MAY</div>
		  	<div>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  	</div>
		  </td>
		  <td id="rightMonth" class="warning" >
		  	<div>JUNE</div>
		  	<div>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  		<span>week1</span>
		  	</div>
		  </td>
		  <td class="fa fa-chevron-right" id="add"></td>
		</tr>
	  </table>
	  <table id="timesheet"></table>
	</body>
</html>