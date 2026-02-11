import React from 'react';
import { useSite } from '../context/SiteContext';
import GridPage from './GridPage';

const Aplicaciones: React.FC = () => {
    const { siteData } = useSite();
    return <GridPage title="Aplicaciones" items={siteData.sections.aplicaciones} />;
};

export default Aplicaciones;
