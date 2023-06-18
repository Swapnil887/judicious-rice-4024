// Function to generate time slots
function createTimeSlots(startTime,endTime,slotDuration) {
    const timeSlots = [];
    let currentTime = startTime;
  
    while (currentTime <= endTime) {
      timeSlots.push(currentTime);
      const [hours, minutes] = currentTime.split(':');
      const time = new Date();
      time.setHours(hours);
      time.setMinutes(minutes);
  
      // Increment currentTime by slotDuration
      time.setMinutes(time.getMinutes() + slotDuration);
      currentTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    }
  
    return timeSlots;
  }


  module.exports = {createTimeSlots}