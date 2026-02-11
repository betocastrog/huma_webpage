import React from 'react';
import { useSite } from '../context/SiteContext';
import GridPage from './GridPage';

const Instrumentacion: React.FC = () => {
    const { siteData } = useSite();
    return <GridPage title="Instrumentación" items={siteData.sections.instrumentacion} />;
};

export default Instrumentacion;
