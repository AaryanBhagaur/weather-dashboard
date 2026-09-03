# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions, 5-day forecasts, and more!

## Features

✨ **Core Features:**
- 🌍 Real-time weather data from OpenWeatherMap API
- 📍 Search weather by city name
- 📊 Current weather display with detailed metrics
- 📅 5-day weather forecast
- 💾 Search history (stored in browser localStorage)
- 📱 Fully responsive design
- 🎨 Modern, clean UI with smooth animations

## Weather Information Displayed

### Current Weather
- 🌡️ Temperature and "Feels Like" temperature
- 💧 Humidity percentage
- 💨 Wind speed
- 👁️ Visibility
- 📉 Atmospheric pressure
- 📈 Maximum temperature
- 🎴 Weather icon and description

### 5-Day Forecast
- Daily high and low temperatures
- Weather conditions and icons
- Date information

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- An OpenWeatherMap API key (free tier available)

### Setup Instructions

1. **Get Your API Key:**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your account dashboard
   - Wait a few minutes for the key to activate

2. **Add API Key to Script:**
   - Open `script.js` in your text editor
   - Find this line: `API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY',`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key
   - Example: `API_KEY: 'abc123def456',`

3. **Open the Dashboard:**
   - Open `index.html` in your web browser
   - Or deploy to a web server

## How to Use

1. **Search for a City:**
   - Enter a city name in the search box
   - Press Enter or click the search button
   - Weather data loads instantly

2. **View Recent Searches:**
   - Previously searched cities appear in the "Recent Searches" section
   - Click any city to view its weather again

3. **Explore Weather Details:**
   - Current weather card shows comprehensive information
   - Hover over forecast cards to see interactions

## Project Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # JavaScript functionality and API integration
├── README.md           # Documentation
└── .gitignore          # Git ignore file
```

## File Descriptions

### index.html
- Semantic HTML5 structure
- Current weather section with info cards
- Forecast grid for 5-day predictions
- Search history display
- Font Awesome icons integration

### styles.css
- CSS3 with CSS variables for theming
- Responsive grid layouts
- Smooth transitions and animations
- Mobile-first responsive design
- Custom color scheme and typography

### script.js
- OpenWeatherMap API integration
- Weather data fetching and processing
- DOM manipulation and updates
- Local storage for search history
- Error handling and mock data for demo
- Date formatting utilities

## API Integration

### Endpoints Used

1. **Current Weather:**
   ```
   https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}
   ```

2. **5-Day Forecast:**
   ```
   https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}
   ```

### API Key Security Note
⚠️ **Important:** Never commit your actual API key to public repositories. Consider using environment variables or a backend proxy for production applications.

## Customization

### Change Temperature Units
Edit `script.js` and change `UNITS` from `'metric'` (Celsius) to `'imperial'` (Fahrenheit):
```javascript
UNITS: 'imperial' // For Fahrenheit
```

### Customize Colors
Edit `:root` variables in `styles.css`:
```css
:root {
    --primary-color: #3498db;      /* Main blue */
    --secondary-color: #2c3e50;    /* Dark text */
    --accent-color: #e74c3c;       /* Red accent */
    /* ... more colors ... */
}
```

### Change Default City
Edit `script.js` and modify the `loadDefaultCity()` function:
```javascript
fetchWeatherByCity('New York'); // Change to your preferred city
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Lazy loading of weather icons
- Efficient DOM updates
- CSS animations for smooth UI
- Local storage for instant history loading
- Debounced search functionality

## Troubleshooting

### "City not found" Error
- Check spelling of the city name
- Try using city,country format (e.g., "Paris,France")
- Ensure you're using English city names

### No Data Displays
- Verify your API key is correctly set in `script.js`
- Check that your API key has been activated (wait a few minutes after creation)
- Check browser console for error messages (F12)
- Ensure you have an internet connection

### API Key Not Working
- Log in to your OpenWeatherMap account
- Verify the API key in dashboard
- Check API usage limits (free tier: 60 calls/minute)
- Try creating a new API key

## Future Enhancements

- [ ] Geolocation-based weather
- [ ] Multiple cities comparison
- [ ] Weather alerts and notifications
- [ ] Hourly forecast
- [ ] Air quality index (AQI)
- [ ] UV index
- [ ] Sunrise/sunset times
- [ ] Dark mode toggle
- [ ] Precipitation probability
- [ ] Pollen count
- [ ] PWA (Progressive Web App) support

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - API integration and DOM manipulation
- **OpenWeatherMap API** - Weather data provider
- **Font Awesome** - Weather icons
- **Local Storage API** - Browser data persistence

## License

This project is open source and available under the MIT License.

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Inspiration: Modern weather applications

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review GitHub issues
3. Create a new issue with detailed description

## Author

Created as a weather dashboard application using public APIs.

---

**Happy Weather Checking! 🌤️⛅🌧️**