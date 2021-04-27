import {ResourcesData} from "../assets/resources"
import Select from "react-select"
import { useState } from 'react';
import {ResponsiveBar} from "@nivo/bar";

export default function Home({data}) {
  let selectOptions = data.map(obj => ({label:obj.key, value: obj.key}))
  let initialSelectOptions = filterMultiSelectSelectedOptions(selectOptions, ["system:serviceaccount:openshift-kube-apiserver-operator:kube-apiserver-operator", "system:serviceaccount:openshift-authentication-operator:authentication-operator", "system:serviceaccount:openshift-apiserver-operator:openshift-apiserver-operator"])
  const [selectValue, setSelectValue] = useState(initialSelectOptions)

  const barIndexKey = "key"
  const initialBarDataset = filterDataset(data, initialSelectOptions)
  const [barData, setBarData] = useState(initialBarDataset)
  const [barKeys, setBarKeys] = useState(getOnlyKeys(initialBarDataset, barIndexKey))


  // reactor
  let onInputChange = (selectedValues) => {
    let barDatasetToDisplay = initialBarDataset
    if (selectedValues.length == 0) {
        setBarData(barDatasetToDisplay)
        setSelectValue(initialSelectOptions)
    } else {
        barDatasetToDisplay = filterDataset(data, selectedValues)
        setBarData(filterDataset(data, selectedValues))
        setSelectValue(selectedValues)
    }
    setBarKeys(getOnlyKeys(barDatasetToDisplay, barIndexKey))
  }

  return (
      <div style={{height: 700, margin: 0}}>
      <Select
          closeMenuOnSelect={false}
          options={selectOptions}
          value={selectValue}
          onChange={onInputChange}
          isMulti
      />
      <ResponsiveBar
              data={barData}
              layout="horizontal"
              keys={barKeys}
              indexBy={barIndexKey}
              margin={{ top: 50, right: 100, bottom: 50, left: 450 }}
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
                  legendPosition: 'middle',
                  legendOffset: 32
              }}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: 'middle',
                  legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              legends={[]}
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
      data: ResourcesData,
    },
  }
}

function filterDataset(data, filters) {
   let filterLabels = filters.map(filter => filter.label)
   return data.filter(item => filterLabels.includes(item.key))
}

function filterMultiSelectSelectedOptions(data, preSelectedOptions) {
    return data.filter(item => preSelectedOptions.includes(item.label))
}

function getOnlyKeys(data, indexKey) {
    let arrays = data.map(item => Object.keys(item))
    let keys = mergeArrays(arrays)
    return keys.filter(key => key != indexKey)
}

function mergeArrays(arrays) {
    let mergedArray = []

    arrays.forEach(array => {
        mergedArray = [...mergedArray, ...array]
    })

    let uniqueArr = [...new Set(mergedArray)];
    return uniqueArr
}