$(document).ready(function(){
	
	window.queryData = queryData;
	
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	showMonthHead(year, month);
	
	function queryData(year, month, week){
		var periodTime = getWeekTime(year, month, week);
		showDate(year, month, periodTime.from.split("-")[2]);
		console.log(state);
		
		$("#timesheet").bootstrapTable({
	        queryParams: function (param) {
	            return {beginTime: state.beginTime, endTime: state.endTime};
	        },
	        url: "/timesheet",
	        columns: [{
	            checkbox: true
	        }, {
	            field: "UserName",
	            title: "用户名",
	            editable: {
	                type: 'text',
	                title: '用户名',
	                validate: function (v) {
	                    if (!v) return '用户名不能为空';

	                }
	            }
	        }, {
	            field: "Age",
	            title: "年龄",
	        }, {
	            field: "Birthday",
	            title: "生日",
	            formatter: function (value, row, index) {
	                var date = eval('new ' + eval(value).source)
	                return date.format("yyyy-MM-dd");
	            }
	        },
	        {
	            field: "DeptName",
	            title: "部门"
	        }, {
	            field: "Hobby",
	            title: "爱好"                
	        }],
	        onEditableSave: function (field, row, oldValue, $el) {
	            $.ajax({
	                type: "post",
	                url: "/time_entry/edit",
	                data: row,
	                dataType: 'JSON',
	                success: function (data, status) {
	                    if (status == "success") {
	                        alert('提交数据成功');
	                    }
	                },
	                error: function () {
	                    alert('编辑失败');
	                },
	                complete: function () {

	                }

	            });
	        }
	    });
	}
	
	$("#add").click(function(){
		addMonth();
	});
	
	$("#reduce").click(function(){
		reduceMonth();
	});
	
	function reduceMonth(){
		month--;
		if(month < 0){
			month += 12;
			year--;
		}
		showMonthHead(year, month);
	}
	
	function addMonth(){
	    month++;
	    if(month>11) {
	    	month -=12;        //Month reduction
	        year++;            //Increased year
	    }
		showMonthHead(year, month);
	}
	
	function showMonthHead(year, month){
		var monArr = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
		
	    var centerMonth = month;
	    var leftMonth = centerMonth -1;
	    var leftYear = year;
	    if(centerMonth == 0){
	    	leftMonth = 11;
	    	leftYear = year - 1;
	    }
	    
	    var rightMonth = centerMonth + 1;
	    var rightYear = year;
	    if(centerMonth == 11){
	    	rightMonth = 0;
	    	rightYear = year + 1;
	    }
	   
		var centerMonthWeeks = getWeeks(year, centerMonth);
		var leftMonthWeeks = getWeeks(leftYear, leftMonth);
		var rightMonthWeeks = getWeeks(rightYear, rightMonth);
		
		$("#leftMonth div:first").html(monArr[leftMonth]);
		$("#leftMonth div:last").html("");
		$("#centerMonth div:last").html("");
		$("#rightMonth div:last").html("");
		for(var i=1; i< leftMonthWeeks + 1; i++){
			$("#leftMonth div:last").append("<span onclick='queryData("+ leftYear + "," + (leftMonth+1) + "," + i +")'>week" + i + "</span>");
		}
		
		$("#centerMonth div:first").html(monArr[centerMonth]);
		for(var i=1; i< centerMonthWeeks + 1; i++){
			$("#centerMonth div:last").append("<span onclick='queryData("+ year + "," + (centerMonth+1) + "," + i +")'>week" + i + "</span>");
		}
		
		$("#rightMonth div:first").html(monArr[rightMonth]);
		for(var i=1; i< rightMonthWeeks + 1; i++){
			$("#rightMonth div:last").append("<span onclick='queryData("+ rightYear + "," + (rightMonth+1) + "," + i +")'>week" + i + "</span>");
		}
		
	}
	
	
	
});


//get a few weeks a month
function getWeeks(year, month) {
        var d = new Date();
        // The first day of the month
        d.setFullYear(year, month-1, 1);
        var w1 = d.getDay();
        if (w1 == 0) w1 = 7;
        // The number of days of the month
        d.setFullYear(year, month, 0);
        var dd = d.getDate();
        // The first Monday
        let d1;
        if (w1 != 1) d1 = 7 - w1 + 2;
        else d1 = 1;
        let week_count = Math.ceil((dd-d1+1)/7);
        return week_count;
}

//Get the date of the week from Monday to Sunday according to year month week.
function getWeekTime(year, month,weekday) {
    var d = new Date();
    // The first day of the month
    d.setFullYear(year, month-1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    // The number of days of the month
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    // The first Monday
    let d1;
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    var monday = d1+(weekday-1)*7;
    var sunday = monday + 6;
    var from = year+"-"+ month +"-"+monday;
    var to;
    if (sunday <= dd) {
        to = year+"-"+month+"-"+sunday;
    } else {
        d.setFullYear(year, month-1, sunday);
        let days=d.getDate();
        to = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+days;
    }
    return {from: from, to: to};
}

//Get the Monday of the month of the week
function getMondayTime(year, month,weekday) {
    var d = new Date();
    // The first day of the month
    d.setFullYear(year, month-1, 1);
    var w1 = d.getDay();
    if (w1 == 0) w1 = 7;
    // The number of days in the month
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    // First Monday
    let d1;
    if (w1 != 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    var monday = d1+(weekday-1)*7;
    return monday;
}

//Get Monday's date
function getMonDate(year, month, day) {
    var d=new Date();
    d.setFullYear(year, month-1, day);
    var day=d.getDay();
    var date=d.getDate();
    if(day==1)
        return d;
    if(day==0)
        d.setDate(date-6);
    else
        d.setDate(date-day+1);
    return d;
}

//get week name
function getDayName(day) {
    var day=parseInt(day);
    if(isNaN(day) || day<0 || day>6)
        return false;
    var weekday=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return weekday[day];
}

function getMonthWeek(a, b, c) {
    var date = new Date(a, parseInt(b) - 1, c), w = date.getDay(), d = date.getDate();
    return Math.ceil(
        (d + 6 - w) / 7
    );
}

//Get the date of the last day of the month
function getLastDay(year,month) {
    var new_year = year;    
    var new_month = month++;//Take the first day of the next month for easy calculation (the last day is not fixed)
    if(month>12) {
        new_month -=12;        //Month reduction
        new_year++;            //Increased year
    }
    var new_date = new Date(new_year,new_month,1);                //Take the first day of the current year
    return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//Get the date of the last day of the month
}



//当前日期几月第几周
function showDate(year, mon, day){
	state = {};
    var d= getMonDate(year, mon, day);
    var ds=new Date();
    ds.setFullYear(year, mon-1, day);
    var arr=[];
    for(var i=0; i<7; i++) {
        let weekDay=this.getDayName(d.getDay());
        let date=d.getDate();
        if(weekDay=='Mon'){
            let beginTime=ds.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            state.beginTime = beginTime;
        }
        if(weekDay=='Sun'){
            let endTime=ds.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
            state.endTime = endTime;
        }
        arr.push({weekDay:weekDay,date:date});
        d.setDate(d.getDate()+1);
    }
    let month=ds.getMonth()+1;
    let week=this.getMonthWeek(ds.getFullYear(),month,ds.getDate())-1;
    //每月周一日期
    let oneDate=this.getMondayTime(ds.getFullYear(),month,1);
    if(ds.getDate()<oneDate){
        month=ds.getMonth();
        week=this.getWeeks(ds.getFullYear(),month);
    }
    this.state.year = ds.getFullYear();
    this.state.month = month;
    this.state.week = week;
    this.state.list = arr;
    this.state.weeks = getWeeks(ds.getFullYear(), month);
  
}





