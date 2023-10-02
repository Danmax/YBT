// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
import { local, session, memory } from 'wix-storage-frontend';

$w.onReady(function () {
let team1 = "Team1Points"
let team2 = "Team2Points"
            let Team1Points = getSessionPoints(team1) || 0; // Get the initial points from the session cache
            getPoints()
            let Team2Points = getSessionPoints(team2) || 0; // Get the initial points from the session cache
            getPoints()

            function getPoints() {
                $w('#Team1Points').text = getSessionPoints().toString()
                $w('#Team1Points').show()
                $w('#Team2Points').text = getSessionPoints().toString()
                $w('#Team2Points').show()

            }
            

            $w('#Team1Plus').onClick(() => {

                let sliderPoint = $w('#Team1Slider').value
                Team1Points = addPoint(Team1Points, sliderPoint);
                $w('#Team1Points').text = Team1Points.toString()
                $w('#Team1Points').show()
                saveSessionPoints(Team1Points); // Save the updated points to the session cache
                console.log(Team1Points);
            });

            $w('#Team1Minus').onClick(() => {
                let sliderPoint = $w('#Team1Slider').value
                Team1Points = minusPoint(Team1Points, sliderPoint);
                $w('#Team1Points').text = Team1Points.toString()
                $w('#Team1Points').show()
                saveSessionPoints(Team1Points); // Save the updated points to the session cache
                console.log(Team1Points);
            });

            

                $w('#Team2Plus').onClick(() => {

                    let sliderPoint = $w('#Team2Slider').value
                    Team2Points = addPoint(Team2Points, sliderPoint);
                    $w('#Team2Points').text = Team2Points.toString()
                    $w('#Team2Points').show()
                    saveSessionPoints(Team2Points); // Save the updated points to the session cache
                    console.log(Team2Points);
                });

                $w('#Team2Minus').onClick(() => {
                    let sliderPoint = $w('#Team2Slider').value
                    Team2Points = minusPoint(Team2Points, sliderPoint);
                    $w('#Team2Points').text = Team2Points.toString()
                    $w('#Team2Points').show()
                    saveSessionPoints(Team2Points); // Save the updated points to the session cache
                    console.log(Team2Points);
                });

                

                $w('#CleanScoreBoard').onClick(() => {
                    let key = 'Team1Points'
                    removePoints(key)
                    Team1Points = 0
                    $w('#Team1Points').text = Team1Points.toString()
                    $w('#Team1Points').show()
                    let key2 = 'Team2Points'
                    removePoints(key2)
                    Team2Points = 0
                    $w('#Team2Points').text = Team2Points.toString()
                    $w('#Team2Points').show()
                });

            


        function addPoint(points, add) {
            let total = points + add;
            let desc = `The previous points was ${points} then added ${add} for a new total of ${total} points`
            console.log(desc) // You can add logic here to save game session information if needed
            return total;
        }

        function minusPoint(points, minus) {
            let total = (points - minus);
            let desc = `The previous points was ${points} then minus ${minus} for a new total of ${total} points`
            console.log(desc)
            // You can add logic here to save game session information if needed
            return total;
        }

        function multPoint(points, mult) {
            let total = points * mult;
            let desc = `The previous points was ${points} then multiplied by ${mult} for a new total of ${total} points`
            console.log(desc) // You can add logic here to save game session information if needed
            return total;
        }

        function divPoint(points, div) {
            let total = points / div;
            let desc = `The previous points was ${points} then divided by ${div} for a new total of ${total} points`
            console.log(desc) // You can add logic here to save game session information if needed
            return total;
        }

        function getSessionPointsOld() {
            // Get the current points from the session cache
            return Number(session.getItem('Team1Points'));
        }

        function saveSessionPointsOld(points) {
            // Save the points to the session cache
            session.setItem('Team1Points', points.toString());
        }

        function removePoints(key) {
            session.removeItem(key)
        }


        function getSessionPoints(teamPoints) {
            // Get the current points from the session cache
            return Number(session.getItem(teamPoints));
        }

        function saveSessionPoints( teamPoints, points) {
            // Save the points to the session cache
            session.setItem(teamPoints, points.toString());
        }

        
})
