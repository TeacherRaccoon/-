package com.kgc.finance.util;

public class PageUtils {

	/**
	 * 计算分页查询的开始下标
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public static Integer getStart(Integer pageNum, Integer pageSize){
		return (pageNum-1)*pageSize;
	}
}
