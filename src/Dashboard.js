import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase, db } from "../config";
import Trip from "../components/Trip";
import { FlatList } from "react-native-gesture-handler";
import Background from "../components/Background";
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Dashboard = () => {
  const [pie, setPie] = useState([]);
  const expenseCollection = firebase.auth().currentUser.uid + '?tbl=expenses';
  const expenseRef = firebase.firestore().collection(expenseCollection);
  async function fetchData() {
    await expenseRef.get().then(querySnapshot => {
      var piedata = [
        { amount: 0, type: 'food', color: 'rgb(255,218,219)', legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { amount: 0, type: 'accommodation', color: 'rgb(198,230,255)', legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { amount: 0, type: 'equipment', color: 'rgb(240,204,191)', legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { amount: 0, type: 'outsource', color: 'rgb(242,188,105)', legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { amount: 0, type: 'other', color: 'rgb(139,180,188)', legendFontColor: "#7F7F7F", legendFontSize: 15 },
        { amount: 0, type: 'transportation', color: 'rgb(250,171,162)', legendFontColor: "#7F7F7F", legendFontSize: 15 }];
      querySnapshot.forEach(doc => {
        const { amount, expense_type } = doc.data();
        //amount = parseFloat(amount);
        switch (expense_type) {
          case 'food':
            piedata[0].amount += parseFloat(amount);
            break;
          case 'accommodation':
            piedata[1].amount += parseFloat(amount);
            break;
          case 'equipment':
            piedata[2].amount += parseFloat(amount);
            break;
          case 'outsource':
            piedata[3].amount += parseFloat(amount);
            break;
          case 'other':
            piedata[4].amount += parseFloat(amount);
            break;
          case 'transportation':
            piedata[5].amount += parseFloat(amount);
            break;
        }
      });
      console.log(piedata)
      setPie(piedata);
    })
  }
  useEffect(() => {
    fetchData();
  }, [])

  console.log(pie)

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <Background>
      <PieChart
        data={pie}
        width={400}
        height={220}
        chartConfig={chartConfig}
        accessor={"type"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
        absolute
      />
      <BarChart
        data={{
          labels: ["Food", "Accommodation", "Transportation", "Equipment", "Outsource", "Other"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={350} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </Background>
  );
};

export default Dashboard;
