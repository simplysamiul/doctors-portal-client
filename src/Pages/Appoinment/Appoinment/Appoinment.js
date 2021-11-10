import React from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import AppoinmentHeader from '../AppoinmentHeader/AppoinmentHeader';
import AvailavelAppoinment from '../AvailavelAppoinment/AvailavelAppoinment';

const Appoinment = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <div>
            <Navigation />
            <AppoinmentHeader date={date} setDate={setDate} />
            <AvailavelAppoinment date={date} />
        </div>
    );
};

export default Appoinment;