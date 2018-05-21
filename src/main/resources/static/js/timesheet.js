$(document).ready(function(){
	
	console.log(getMonthWeek(2018,7,8));
	
	window.queryData = queryData;
	window.update = update;
	window.note = note;
	//current date time
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	//current timesheet
	var timesheet;
	//timesheet table body
	var ts_body = $("#ts_body");
	//Display navigation bar
	showMonthHead(year, month);
	//Get detailed information for this week, including start date, end date, and daily list.
	showDate(year, month + 1, date);
	showDatePeriod();
	queryData(year, month+1, state.week);
	
	$("#next").click(function(){
		nextWeek();
	});
	
	function nextWeek(){
		year = state.year;
		month = state.month;
		week = state.week;
		week++;
		var weeks = getWeeks(year, month);
		if(week > weeks){
			month++
			week = 1;
			if(month > 12){
				year++;
				month = 1;
			}
		}
		state.year = year;
		state.month = month;
		state.week = week;
		showMonthHead(year, month);
		showDatePeriod();
		queryData(year, month, week);
	}
	
	function note(el){
		$("#myModal").modal('show');
		note = $(el).parent().attr('note');
		id = $(el).parent().attr('id');
		$("#note").val(note == 'null' ? '' : note);
	}
	
	$("#note_submit").click(function(){
		note = $("#note").val();
		var url = '/time_entry/note';
		//update data
		$.ajax({
			url: url,
			type: "PUT",
			data: {id: id, note: note},
			dataType: "json",
			success: function(data){
				if(data.result){
					$("#myModal").modal('hide');
					alert('edit note success');
					window.location.reload();
				}else{
					alert('edit note fail');
				}
			},
			error: function(error){
				console.log(error);
			}
		});
			
	});
	
	
	$("#submit").click(function(){
		$.ajax({
			url: '/submit?id=' + timesheet.id,
			type: "PUT",
			dataType: "json",
			success: function(data){
				if(data.result){
					alert("submit success");
					window.location.reload();
				}else{
					alert("submit error");
				}
			},
			error: function(error){
				console.log(error);
			}
		});
	});
	
	//edit time entry
	function update(el){
		var hours = parseInt($(el).val());
		var id = $(el).parent().attr("id");
		var date = $(el).parent().attr("date");
		var asid = $(el).parent().attr("asid");
		if(!hours || hours < 0 || hours > 24){
			alert("must be a number and more than 0 less than 24");
		}else{
			var url = '/time_entry/update?hours=' + hours + "&date=" + date + "&asid=" + asid + "&id=" + id + "&sheetId=" + timesheet.id;
			//update data
			$.ajax({
				url: url,
				type: "PUT",
				dataType: "json",
				success: function(data){
					if(data.result){
						calcRowTotal();
						calcuTimeSheetTotal();
					}else{
						alert("update error");
					}
				},
				error: function(error){
					console.log(error);
				}
			});
			
		}
	}
	
	//Display date information
	function showDatePeriod(){
		$("#time_period").html("Week" + state.week + "," + state.beginTime + "/" + state.endTime);
	}
	
	 //setting timesheet table header   
	function setTableHeader(){
		var ts_header = $("#ts_header");
		ts_header.html("");
		ts_header.append("<th>Assignment ID</th>");
		for(var i=0; i< state.list.length; i++){
			ts_header.append("<th>" + state.list[i].weekDay + " " + state.list[i].date + "</th>");
		}
		ts_header.append("<th>Total</th>");
	}
	
	//get the timsheet data
	function queryData(year, month, week){
		//get the week end date and start date
		var periodTime = getWeekTime(year, month, week);
		//Get more details of the week, Finally the week information is stored in the global variable "state"
		showDate(year, month, periodTime.from.split("-")[2]);
		console.log(state);
		showDatePeriod();
		setTableHeader();
		//Get the week's timesheet information from the back-end
		$.ajax({
			url: '/timesheet',
			data: {beginTime: state.beginTime, endTime: state.endTime},
			dataType: "json",
			success: function(data){
				ts_body.html("");
				if(data){
					//Timsheet is stored in global variables, and will be used when modifying information.
					timesheet = data[0].timesheet;
					//loop each row of data
					for(var i = 0; i < data.length; i++){
						console.log(data[i]);
						var total = 0;
						var tr = $("<tr>")
						tr.append("<td>" + data[i].assignment.id + "</td>");
						//loop each cell (timeentry) 
						for(var j = 0; j < data[i].list.length; j++ ){
							var td = $("<td note='"+ data[i].list[j].note +"' asid='"+ data[i].list[j].assignment.id +"' id='"+ data[i].list[j].id +"' date='" + data[i].list[j].date +"'></td>");
							if(timesheet.status == "NEW"){
								td.append("<input type='text' class='col-md-8' onchange= 'update(this)' value='" + data[i].list[j].hours +"'>")
							}else{
								td.append("<input type='text' class='col-md-8' onchange= 'update(this)' disabled='disabled' value='" + data[i].list[j].hours +"'>")
							}
							td.append("<span class='fa fa-comment' onclick='note(this)'></span>")
							tr.append(td);
							total += data[i].list[j].hours;
						}
						tr.append("<td><span class='col-md-8' value='"+ total +"'>" + total + "</span></td>");
						ts_body.append(tr);
					}
					var totalTr = $("<tr>");
					totalTr.append("<td>total</td>");
					for(var w = 0; w < 7; w++){
						totalTr.append("<td></td>");
					}
					totalTr.append("<td></td>");
					ts_body.append(totalTr);
					
					calcuTimeSheetTotal();
				}
			},
			error: function(e){
				ts_body.html("");
			}
		})
	}
	
/*----------------  per column calculation for the timesheet table    ---------------------------*/
	
	// per column calculation for the timesheet table
	function calcuTimeSheetTotal(){
		for(var t = 1; t < 9; t++){
			calcTotal($('#timesheet'), t);
		}
	}
	
	function calcRowTotal(){
		 var trs =  $('#timesheet tr');
		 var rowIndex = 0;
		 trs.each(function() {
			 if(rowIndex != 0 && rowIndex != trs.length-1){
				var rowTotal = 0;  
		        var tds = $(this).find('td');
		        var colIndex = 0;
		        tds.each(function() {  
		        	if(colIndex != 0 && colIndex != tds.length -1 ){
		        		var hours = $(this).find('input').first().val();
		        		rowTotal += parseFloat(hours);  
		        	}
		        	colIndex++;
		        });  
		        tds.eq(tds.length-1).html("<span class='col-md-8' value='"+ rowTotal +"'>" + rowTotal + "</span>");
			 }
		     rowIndex++;  
		 });  
	}
	
	//Calculation of the specified column addition in the table
	function calcTotal(table,column){//To sum up, which column is need to total the table object, the first column starts from 0.
        var trs = table.find("tr");
        var start=1,//ignoring the first line of the head
            end=trs.length-1;//Ignore the last line
        var total=0;
        for(var i=start;i<end;i++){
            var td=trs.eq(i).find('td').eq(column);
            var hoursInput = td.children().first();
            var t=parseFloat(hoursInput.attr('value'));
            if(t)total+=t;
        }
        trs.eq(end).find('td').eq(column).html("<span class='col-md-8'>" + total + "</span>");
    };
	
   
	
/*------------------- Time    Navigation bar operation       --------------------------*/
	$("#add").click(function(){
		addMonth();
	});
	
	$("#reduce").click(function(){
		reduceMonth();
	});
	
	//Move the navigation bar to the left
	function reduceMonth(){
		month--;
		if(month < 0){
			month += 12;
			year--;
		}
		showMonthHead(year, month);
	}
	
	//Move the navigation bar to the right
	function addMonth(){
	    month++;
	    if(month>11) {
	    	month -=12;        //Month reduction
	        year++;            //Increased year
	    }
		showMonthHead(year, month);
	}
	
	//Calculate the date and display the navigation bar, month begin with 0
	//The incoming parameter is the middle month and the year of the navigation bar
	function showMonthHead(year, month){
		var monArr = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
	    var centerMonth = month;
	    //Calculate the month and year on the left
	    var leftMonth = centerMonth -1;
	    var leftYear = year;
	    if(centerMonth == 0){
	    	leftMonth = 11;
	    	leftYear = year - 1;
	    }
	    //Calculate the month and year on the right
	    var rightMonth = centerMonth + 1;
	    var rightYear = year;
	    if(centerMonth == 11){
	    	rightMonth = 0;
	    	rightYear = year + 1;
	    }
	    //calculate the number of weeks for per month
		var centerMonthWeeks = getWeeks(year, centerMonth + 1);
		var leftMonthWeeks = getWeeks(leftYear, leftMonth + 1);
		var rightMonthWeeks = getWeeks(rightYear, rightMonth + 1);
		
		$("#leftMonth div:first").html(monArr[leftMonth]);
		$("#leftMonth div:last").html("");
		$("#centerMonth div:last").html("");
		$("#rightMonth div:last").html("");
		//show the weeks for each month
		for(var i=1; i< leftMonthWeeks + 1; i++){
			$("#leftMonth div:last").append("<span onclick='queryData("+ leftYear + "," + (leftMonth+1) + "," + i +")'>week" + i + "</span>");
		}
		
		$("#centerMonth div:first").html(monArr[centerMonth]);
		for(var j=1; j< centerMonthWeeks + 1; j++){
			$("#centerMonth div:last").append("<span onclick='queryData("+ year + "," + (centerMonth+1) + "," + j +")'>week" + j + "</span>");
		}
		
		$("#rightMonth div:first").html(monArr[rightMonth]);
		for(var k=1; k< rightMonthWeeks + 1; k++){
			$("#rightMonth div:last").append("<span onclick='queryData("+ rightYear + "," + (rightMonth+1) + "," + k +")'>week" + k + "</span>");
		}
		
	}
});








