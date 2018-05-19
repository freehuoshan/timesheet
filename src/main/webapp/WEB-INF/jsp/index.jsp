<!DOCTYPE html>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html;charset=utf-8" %>  
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
		<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
		<link rel="stylesheet" href="css/bootstrap-table.min.css">
		<link href="css/timesheet.css" rel="stylesheet"/>
		
		<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script> 
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
		<script src="js/bootstrap-table.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-zh-CN.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/editable/bootstrap-table-editable.js"></script>
		<script src="js/timeutil.js" type="text/javascript"></script>
		<script src="js/timesheet.js"></script>
	</head>
	<body>
	
	  <table class="table time_navigation">
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
	<div id="time_period">
		2018-05-14/2018-05-20
	</div>
	<div id="timesheet_div" class="col-md-10 col-md-offset-1">
		<table id="timesheet" class="table table-bordered">
		  	<thead>
		      <tr id="ts_header">
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Email</th>
		      </tr>
		    </thead>
		    <tbody id="ts_body">
		      
		    </tbody>
	 	</table>
	 	<button id="submit" class="btn col-md-offset-6">Submit</button>
	</div>
	
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
						&times;
					</button>
					<h4 class="modal-title" id="myModalLabel">
						Edit Note
					</h4>
				</div>
				<div class="modal-body">
					<textarea id="note" class="form-control" cols="10"></textarea>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">close
					</button>
					<button id="note_submit" type="button" class="btn btn-primary">
						submit
					</button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
	</body>
</html>