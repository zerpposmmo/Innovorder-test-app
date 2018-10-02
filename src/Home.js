import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

const dotenv = require('dotenv');
const env = dotenv.config().parsed;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            nextOrderDate: {},
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + '/schedule')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        this.getNextOrderDate();
        setInterval(this.getNextOrderDate.bind(this), 60000);
    }

    displayTwoDigits(number) {
        if (number < 10) {
            return '0' + number.toString();
        }
        return number.toString();
    }

    getSchedules() {
        fetch(process.env.REACT_APP_API_URL + '/schedule')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    getNextOrderDate() {
        fetch(process.env.REACT_APP_API_URL + '/next-order-date')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        nextOrderDate: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data)
    }

    updateSchedule(scheduleId, day, start, end) {
        fetch(process.env.REACT_APP_API_URL + '/schedule/' + scheduleId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                day: day,
                start: start,
                end: end
            })
        }).then(res => res.json())
            .then(
                (result) => {
                    this.getSchedules();
                    console.log(result)
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        let scheduleSet = this.state.items.map(schedule => {
            return <div className="d-flex flex-row justify-content-center mb-2 schedule-group">
                <div key={schedule.scheduleId} className="d-inline-flex schedule">
                    <div>
                        {schedule.day} : {this.displayTwoDigits(Math.floor(schedule.start / 60))} :
                        {this.displayTwoDigits(schedule.start % 60)} -
                        {this.displayTwoDigits(Math.floor(schedule.end / 60))} :
                        {this.displayTwoDigits(schedule.end % 60)}
                    </div>
                </div>
            </div>;
        });
        return (
            <div className="App">
                <ul className="d-flex flex-column schedules">{scheduleSet}</ul>
                <h4>
                    Next ordering date : {this.state.nextOrderDate.day} at {this.displayTwoDigits(Math.floor(this.state.nextOrderDate.minutes / 60))}:
                    {this.displayTwoDigits(Math.floor(this.state.nextOrderDate.minutes % 60))}
                </h4>
            </div>
        );
    }
}

export default Home;
