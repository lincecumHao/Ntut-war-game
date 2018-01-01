import React from 'react';
import { VictoryPie } from 'victory';

const Pie = ({ avaliable, used }) => {
    return (
        <VictoryPie
            animate={{
                duration: 2000
            }}
            colorScale={['white', 'red']}
            labelRadius={90}
            style={{ labels: { fill: 'black', fontSize: 20, fontWeight: 'bold' } }}
            data={[
                { x: avaliable - used, y: avaliable - used, color: 'white' },
                { x: used, y: used, color: 'red' }
            ]}
        />
    );
};


export default Pie;