import {Resources} from "../assets/resources-list"
import {ResourcesData} from "../assets/resources"
import Select from "react-select"
import { useState } from 'react';
import {ResponsiveBar} from "@nivo/bar";

export default function Home({resources, data}) {
  const [barData, setBarData] = useState(data);
  let selectOptions = resources.map(obj => ({label:obj.node.name, value: obj.node.id}));
  console.log(data);
  let onInputChange = (inputValue) => {
    console.log(inputValue);
    if (inputValue.length == 0) {
        setBarData(data)
    } else {
        setBarData([data[4]])
    }
  };
  return (
      <div style={{height: 800}}>
      <Select
          closeMenuOnSelect={false}
          options={selectOptions}
          onChange={onInputChange}
          isMulti
      />
      <ResponsiveBar
              data={barData}
              layout="horizontal"
              keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
              indexBy="country"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={{ scheme: 'nivo' }}
              defs={[
                  {
                      id: 'dots',
                      type: 'patternDots',
                      background: 'inherit',
                      color: '#38bcb2',
                      size: 4,
                      padding: 1,
                      stagger: true
                  },
                  {
                      id: 'lines',
                      type: 'patternLines',
                      background: 'inherit',
                      color: '#eed312',
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                  }
              ]}
              fill={[
                  {
                      match: {
                          id: 'fries'
                      },
                      id: 'dots'
                  },
                  {
                      match: {
                          id: 'sandwich'
                      },
                      id: 'lines'
                  }
              ]}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'country',
                  legendPosition: 'middle',
                  legendOffset: 32
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'food',
                  legendPosition: 'middle',
                  legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
          />
      </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      resources: Resources,
      data: ResourcesData,
    },
  }
}