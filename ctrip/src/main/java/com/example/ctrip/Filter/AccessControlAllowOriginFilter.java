package com.example.ctrip.Filter;

/**
 * @description:
 * @author: 卢智伟
 * @date: 2019-08 17:20
 */

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.WebFault;
import java.io.IOException;

/**
     * 解决跨域问题
     */
@WebFilter(urlPatterns = "/*")
    public class AccessControlAllowOriginFilter implements Filter {

        public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
            HttpServletResponse response = (HttpServletResponse) res;
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.addHeader("Access-Control-Allow-Headers", "Content-Type,X-CAF-Authorization-Token,sessionToken,X-TOKEN");
            if (((HttpServletRequest) req).getMethod().equals("OPTIONS")) {
                response.getWriter().println("ok");
                return;
            }
            chain.doFilter(req, response);
        }

        public void init(FilterConfig filterConfig) {

        }

        public void destroy() {

        }

    }

