import React from 'react';
import{ BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TecherList from './pages/TecherList';
import TecherForm from './pages/TecherForm';

function Routes (){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TecherList} />
            <Route path="/give-clesses" component={TecherForm} />
        </BrowserRouter>
    )
}

export default Routes; 