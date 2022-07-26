import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { CContainer, CFormInput, CRow } from '@coreui/react';
import { List } from './components/list/List';
import { Spinner } from './components/spinner/Spinner';
import { getKeyValue } from './helpers/getKeyValue';

function App() {
  const [userInput, setUserInput] = useState("");
  const [keywords, setKeywords] = useState("");
  const [apiData, setApiData] = useState([]);

  const userQuery = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setUserInput(lowerCase);
  };

  const userKeywords = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setKeywords(lowerCase);
  };

  useEffect(() => {
    let url = '';
    if (userInput.length < 4) {
      url = `http://content.guardianapis.com/search?api-key=test&amp;show-fields=thumbnail,headline&amp;page=1&amp;page-size=10`;
    }
    if (userInput.length >= 4 && keywords.length === 0) {
      url = `http://content.guardianapis.com/search?api-key=test&amp;q=${userInput}&amp;show-fields=thumbnail,headline&amp;page=1&amp;page-size=10`;
    }
    if (userInput.length >= 4 && keywords.length > 0) {
      url = `http://content.guardianapis.com/search?api-key=test&amp;q=${userInput}&amp;show-fields=thumbnail,headline&amp;show-tags=${keywords}&amp;page=1&amp;page-size=10`
    }
    axios.get(url, '').then(res => {
        setApiData(getKeyValue(res, 'data.response.results', []));
        console.log(url);
        console.log(getKeyValue(res, 'data.response.total', 0));
      }).catch((e) => {
        console.log(e)
      });
  }, [userInput, keywords]);
  

  return (
    <CContainer className='main'>
      <CRow>
        <h1>News Lister</h1>
      </CRow>
      <CRow>
      <CFormInput
          type='text'
          id="outlined-basic"
          variant="outlined"
          onChange={userQuery}
          label="Search"
        />
      </CRow>
      <CRow>
      <CFormInput
          type='text'
          id="outlined-basic"
          variant="outlined"
          onChange={userKeywords}
          label="Keywords"
        />
      </CRow>
      <CRow>
      {apiData.length > 0 ? <List data={apiData} /> : <Spinner />}
      </CRow>
    </CContainer>
  );
}

export default App;
