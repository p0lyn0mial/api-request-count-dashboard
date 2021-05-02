import {ResponsiveBar} from "@nivo/bar";

import {store} from "../assets/store"
import {getOnlyKeys, filterDataset} from "../assets/dataset"

export default function Details() {
   // common
   const barIndexKey = "key"

   const state = store.getState()
   const barData = filterDataset(state.dataSetView, [{label: state.selectedRowID}])
   const barKeys = getOnlyKeys(barData, barIndexKey)

   let onGoBackClick = () => {
       window.location.href = "#main"
   }

   return(
       <div style={{height: 95 + "vh"}}>
           <h4>
               You are currently viewing {state.selectedRowID} with {barKeys.length} distinct values. To go to the previous page <button type="button" onClick={onGoBackClick} > click </button>
           </h4>
           <ResponsiveBar
               data={barData}
               keys={barKeys}
               indexBy={barIndexKey}
               margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
               padding={0}
               minValue={0}
               groupMode="grouped"
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
               borderColor={{ from: 'color', modifiers: [ [ 'darker', 2.5 ] ] }}
               borderWidth={2}
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
               labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 3 ] ] }}
               legends={[]}
               animate={true}
               motionStiffness={90}
               motionDamping={15}
           />
       </div>
   )
}
