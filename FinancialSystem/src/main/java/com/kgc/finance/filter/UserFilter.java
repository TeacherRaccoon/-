package com.kgc.finance.filter;


import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/***
 * User过滤器,这里设置的拦截路径为user下的所有路径,可以结合controller使用
 * @Date 2019/8/7
 *
 */
//@WebFilter(urlPatterns = {"/view/*"})
public class UserFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        Cookie[] cook=request.getCookies();
        boolean flag=false;
        for (Cookie cc:cook){
            if(cc.getName().equals("token")){
                if (cc.getValue()!=null){
                    flag=true;break;
                }
            }
        }
        if (!flag) {
            response.sendRedirect("/error.html");
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

    @Override
    public void destroy() {

    }
}

