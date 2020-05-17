import React from 'react'

import {
    LineChart,
    ResponsiveContainer,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    AreaChart,
    Legend,
    Text
} from "recharts";
export default function Chart(props) {
    console.log('chart', props.chartData);

    return (
        <div className={`line-chart-wrapper`} style={{ "height": "300px" }}>
            <ResponsiveContainer>
                <LineChart
                    data={props.chartData || []}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                    <XAxis
                        dataKey="id"
                        tick={{ stroke: '#000000' }}
                        axisLine={{ stroke: "#000000", strokeWidth: 1 }}
                        tickLine={{ stroke: "#000000", strokeWidth: 1 }}

                    >
                        <Label value="ID" offset={1} position="bottom" />
                    </XAxis>
                    <YAxis label={{ value: 'Point', angle: -90, position: 'insideLeft' }} dataKey="count" type="category" />
                    {/* <Tooltip
                        itemStyle={{ color: '#ffffff' }}
                        contentStyle={{ 'background-color': 'rgba(00,00,00,0.8)' }}
                    /> */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line
                        name="Points"
                        type="monotone"
                        dataKey="count"
                        stroke="#333333"
                        strokeWidth={2}

                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
