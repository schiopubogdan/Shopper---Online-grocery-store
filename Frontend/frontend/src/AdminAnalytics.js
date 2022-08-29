import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import "./AdminAnalytics.css";
export default function AdminAnalytics() {
  const [info, setInfo] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function CustomTooltipOrders({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} :`}</p>
          <p className="label">{`${payload[0].value}`} orders</p>
        </div>
      );
    }

    return null;
  }
  function CustomTooltipIncomes({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} :`}</p>
          <p className="label">{`${payload[0].value}`} LEI</p>
        </div>
      );
    }

    return null;
  }
  function CustomTooltipUsers({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} :`}</p>
          <p className="label">{`${payload[0].value}`} accounts</p>
        </div>
      );
    }

    return null;
  }

  useEffect(() => {
    const getInfo = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8080/api/order/analytics"
        );
        setInfo(resp.data);
        console.log(resp.data);
        setOrdersData([
          {
            name:
              new Date(new Date().getTime() - 168 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 168 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[0],
          },
          {
            name:
              new Date(new Date().getTime() - 144 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 144 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[1],
          },
          {
            name:
              new Date(new Date().getTime() - 120 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 120 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[2],
          },
          {
            name:
              new Date(new Date().getTime() - 96 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 96 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[3],
          },
          {
            name:
              new Date(new Date().getTime() - 72 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 72 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[4],
          },
          {
            name:
              new Date(new Date().getTime() - 48 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 48 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[5],
          },
          {
            name:
              new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.orders[6],
          },
        ]);
        setIncomeData([
          {
            name:
              new Date(new Date().getTime() - 168 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 168 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[0] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 144 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 144 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[1] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 120 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 120 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[2] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 96 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 96 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[3] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 72 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 72 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[4] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 48 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 48 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[5] * 100) / 100,
          },
          {
            name:
              new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getMonth()
              ],
            uv: Math.round(resp.data.incomes[6] * 100) / 100,
          },
        ]);
        setUsersData([
          {
            name:
              new Date(new Date().getTime() - 168 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 168 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[0],
          },
          {
            name:
              new Date(new Date().getTime() - 144 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 144 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[1],
          },
          {
            name:
              new Date(new Date().getTime() - 120 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 120 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[2],
          },
          {
            name:
              new Date(new Date().getTime() - 96 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 96 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[3],
          },
          {
            name:
              new Date(new Date().getTime() - 72 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 72 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[4],
          },
          {
            name:
              new Date(new Date().getTime() - 48 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 48 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[5],
          },
          {
            name:
              new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                .getDate()
                .toString() +
              " " +
              monthNames[
                new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getMonth()
              ],
            uv: resp.data.users[6],
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    getInfo();
  }, []);
  if (info === null) {
    return <div>No info available</div>;
  }
  return (
    <div>
      <AdminNavbar />
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              LAST 7 DAYS ORDERS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
              <div className="admin-analytics-chart-div">
                <BarChart
                  width={1450}
                  height={400}
                  data={ordersData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltipOrders />} />
                  <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              LAST 7 DAYS INCOME
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div class="accordion-body">
              <div className="admin-analytics-chart-div">
                <BarChart
                  width={1450}
                  height={400}
                  data={incomeData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltipIncomes />} />
                  <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              LAST 7 DAY NEW ACCOUNTS
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div class="accordion-body">
              <div className="admin-analytics-chart-div">
                <BarChart
                  width={1450}
                  height={400}
                  data={usersData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltipUsers />} />
                  <Bar dataKey="uv" barSize={30} fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
