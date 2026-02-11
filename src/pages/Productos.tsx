import React from 'react';
import { useSite } from '../context/SiteContext';
import GridPage from './GridPage';

const Productos: React.FC = () => {
    const { siteData } = useSite();
    return <GridPage title="Productos" items={siteData.sections.productos} />;
};

export default Productos;
