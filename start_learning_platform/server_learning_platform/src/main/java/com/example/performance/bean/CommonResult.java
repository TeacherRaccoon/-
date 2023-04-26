package com.example.performance.bean;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 请求信息类，用于返回请求是否成功
 * @param <T>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T>{
    /**
     * 响应状态码
     */
    private int code;

    /**
     * 响应结果描述
     */
    private String message;

    /**
     * 返回的数据
     */
    private T data;

    /**
     * 成功返回
     * @param data
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> success(T data) {
        CommonResult<T> response= new CommonResult<>();
        response.setCode(CodeEnum.SUCCESS.getCode());
        response.setMessage(CodeEnum.SUCCESS.getMessage());
        response.setData(data);
        return response;
    }

    /**
     *  失败返回,自定义code
     * @param code
     * @param message
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> fail(Integer code, String message) {
        CommonResult<T> response = new CommonResult<>();
        response.setCode(code);
        response.setMessage(message);
        return response;
    }

    /**
     *  失败返回
     * @param codeEnum
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> fail(CodeEnum codeEnum) {
        CommonResult<T> response = new CommonResult<>();
        response.setCode(codeEnum.getCode());
        response.setMessage(codeEnum.getMessage());
        return response;
    }
    /**
     *  失败返回
     * @param message
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> fail(String message) {
        CommonResult<T> response = new CommonResult<>();
        response.setCode(CodeEnum.ERROR.getCode());
        response.setMessage(message);
        return response;
    }

}
