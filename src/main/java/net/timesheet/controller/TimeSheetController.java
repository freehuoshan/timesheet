package net.timesheet.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author huoshan
 * created by 2018年5月14日 下午3:27:52
 * 
 */
@Controller
public class TimeSheetController {
	
	@RequestMapping("/")
	public String index(Map<String, Object> map){
		map.put("message", "HelloWorld");
		return "index";
	}
}
