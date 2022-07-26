import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CContainer, CCardSubtitle, CRow, CCol } from '@coreui/react';
import { getKeyValue } from '../../helpers/getKeyValue';

export const List = ({data}) => {
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        setFetchedData(data);
    }, [data]);
    

  return (
    <CContainer>
        <CRow>
            <CCol lg='6'>
        {fetchedData.map((item) => {
        return <CCard key={item.id} style={{ width: '100%', margin: '25px 0', padding: '10px', boxShadow: '5px 5px 5px #888888' }}>
        <CCardImage orientation="top" src={getKeyValue(item, 'image', 'https://i.stack.imgur.com/y9DpT.jpg')} width='250px' height='100%' />
        <CCardBody>
            <a href={item.webUrl} rel='noreferrer' target='_blank'><CCardTitle>{item.webTitle}</CCardTitle></a>
            <CCardText>{item.pillarName}</CCardText>
            <CCardSubtitle>{item.type}</CCardSubtitle>
            <p><em>{new Date(item.webPublicationDate).toString()}</em></p>
        </CCardBody>
        </CCard>
    })}
    </CCol>
    </CRow>
    </CContainer>
  )
}
