import { useState } from "react"
import Select from "react-select"

import {ResponsiveBar} from "@nivo/bar"
import { Chip } from "@nivo/tooltip"

import {store, setDataSetView, setSelectedRowID, setSelectedOptions} from "../assets/store"
import {filterDataset, getOnlyKeys} from "../assets/dataset"

export default function Main({data, setComponentToDisplay}) {
  if (!Array.isArray(data)) { data = [] }
  const state = store.getState()

  let initialSelectOptions = [{}]
  if (!state.selectedOptions || state.selectedOptions.length == 0) {
     if (data.length >= 5) {
         initialSelectOptions = data.slice(0, 5).map(obj => ({label:obj.key, value: obj.key}))
     } else {
         initialSelectOptions = data.map(obj => ({label:obj.key, value: obj.key}))
     }
      store.dispatch(setSelectedOptions(initialSelectOptions))
  } else {
      initialSelectOptions = state.selectedOptions
  }

  const selectOptions = data.map(obj => ({label:obj.key, value: obj.key}))
  const [selectedValues, setSelectedValues] = useState(initialSelectOptions)

  const barIndexKey = "key"
  const initialBarDataset = filterDataset(data, initialSelectOptions)
  const [barData, setBarData] = useState(initialBarDataset)
  const [barKeys, setBarKeys] = useState(getOnlyKeys(initialBarDataset, barIndexKey))

  // selecting items in the multi-select triggers this reactor
  let onMultiSelectChange = (selectedValues) => {
    let barDatasetToDisplay = filterDataset(data, selectedValues)
    setBarData(barDatasetToDisplay)
    setSelectedValues(selectedValues)
    setBarKeys(getOnlyKeys(barDatasetToDisplay, barIndexKey))
    store.dispatch(setSelectedOptions(selectedValues))
  }

  // clicking on a horizontal row triggers this reactor
  let onBarItemClick = (node, ev) => {
      store.dispatch(setDataSetView(barData))
      store.dispatch(setSelectedRowID(node.indexValue))
      setComponentToDisplay("details")
  }

  return (
      <div style={{ width: "100%", height: "75vh" }}>
      <h4>You are currently viewing top {barData.length} out of {data.length} items. Use the multi select below to remove or add filters. Clicking on a row allows you to see more details for a selected item.</h4>
      <Select
          closeMenuOnSelect={false}
          options={selectOptions}
          value={selectedValues}
          onChange={onMultiSelectChange}
          isMulti
      />
      <ResponsiveBar
              data={barData}
              layout="horizontal"
              keys={barKeys}
              indexBy={barIndexKey}
              onClick={onBarItemClick}
              margin={{ top: 50, right: 100, bottom: 50, left: 250 }}
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
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
              borderWidth={1}
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
              tooltip={({ id, value, color }) => (
                  <div>
                      <Chip color={color} />
                      {value !== undefined ? (
                          <span style={{ overflowWrap: "break-word" }}>
                  {id}: <strong>{`${value}`}</strong>
                </span>
                      ) : (
                          id
                      )}
                  </div>
              )}
              theme={{
                  tooltip: {
                      container: {
                          width: "190px"
                      }
                  }
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
              legends={[]}
              animate={false}
              motionStiffness={90}
              motionDamping={15}
          />
      </div>
  )
}
