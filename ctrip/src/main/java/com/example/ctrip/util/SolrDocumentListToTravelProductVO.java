package com.example.ctrip.util;

import com.example.ctrip.Pojo.TravelProductVO;
import org.apache.solr.client.solrj.response.Group;
import org.apache.solr.common.SolrDocumentList;

import java.math.BigDecimal;
import java.util.*;

public class SolrDocumentListToTravelProductVO {

    /**
     *
     * @param solrDocuments
     * @return
     */
    public static List<TravelProductVO> parse(SolrDocumentList solrDocuments){
        if(solrDocuments==null){
            return  null;
        }
        List<TravelProductVO> tList=new ArrayList<>();
        for (int i=0;i<solrDocuments.size();i++){
            TravelProductVO travelProductVO=new TravelProductVO();
            Map map=solrDocuments.get(i).getFieldValueMap();
            travelProductVO.setId((Integer) map.get("id"));
            travelProductVO.setProviderAbb((String) map.get("providerAbb"));
            travelProductVO.setDepartCityName((String) map.get("departCityName"));
            travelProductVO.setTotalPrice(new BigDecimal(map.get("totalPrice").toString()));
            travelProductVO.setProductDetail((String) map.get("productDetail"));
            travelProductVO.setTravelCount( map.get("travelCount")==null?0:(Integer) map.get("travelCount"));
            travelProductVO.setHasServiceAss((String) map.get("hasServiceAss"));
            travelProductVO.setHasFeature((String) map.get("HasFeature"));
            travelProductVO.setDistinationName((String) map.get("distinationName"));
            travelProductVO.setImgUrl((String) map.get("imgUrl"));
            travelProductVO.setProviderId((Integer) map.get("providerId"));
            travelProductVO.setSubHead((String) map.get("subHead"));
            travelProductVO.setProName((String) map.get("proName"));
            travelProductVO.setProviderName((String) map.get("providerName"));
            travelProductVO.setTravelProductType((String) map.get("travelProductType"));
            travelProductVO.setProductLevel((Integer) map.get("productLevel"));
            tList.add(travelProductVO);
            System.out.println(travelProductVO.getTotalPrice());
        }
        return  tList;
    }
}
