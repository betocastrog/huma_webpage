import React from 'react';
import { useSite } from '../context/SiteContext';
import GridPage from './GridPage';

const Servicios: React.FC = () => {
    const { siteData } = useSite();
    return <GridPage title="Servicios" items={siteData.sections.servicios} />;
};

export default Servicios;
