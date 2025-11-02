import React from 'react';
import { use } from "react";
import Drivers from '../../../companyui/drivers';
import DeliveryDashBoard from '../../../companyui/delivery';
// import VehicleDashBoard from '../../../companyui/vehicle';
import Report from '../../../companyui/report';
import SettingsDashBoard from '../../../companyui/settings';
import TrackingDashBoard from '../../../companyui/tracking';

const Company = (
    {
        params,
    }: {
        params: Promise<{ service: string }>
    }
) => {
    const { service } = use(params);


    if (service === 'drivers') {
        return <Drivers />;
    } else if (service === 'delivery') {
        return <DeliveryDashBoard />;
    } else if (service === 'report') {
        return <Report />;
    } else if (service === 'settings') {
        return <SettingsDashBoard />;
    } else if (service === 'tracking') {
        return <TrackingDashBoard />;
    }



    return (
        <div>
            <p>Nones</p>

        </div>
    )
}

export default Company
