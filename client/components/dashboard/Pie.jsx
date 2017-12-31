import React from 'react';
import { PieChart } from 'react-easy-chart';
import { VictoryPie } from 'victory';

// const Pie = ({ width, avaliable, used }) => {
//     return (
//         <PieChart
//             labels
//             size={width}
//             data={[
//                 { key: avaliable - used, value: avaliable - used, color: 'white' },
//                 { key: used, value: used, color: 'red' }
//             ]}
//         />
//     );
// };

const Pie = ({ width, avaliable, used }) => {
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