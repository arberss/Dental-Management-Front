import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState } from 'react';
import { useQuery } from '@/hooks/react-query/useQuery';
import { endpoints } from '@/config/endpoints';
import { Box } from '@mantine/core';
import AddEvent from './components/AddEvent/AddEvent';
import { eventColor, ISchedule } from './components/AddEvent/helper';
import dayjs from 'dayjs';
import RightContent from '@/shared-components/Layouts/RightContent/RightContent';

function Schedule() {
  const [events, setEvents] = useState<Record<string, any>[]>([]);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [clickedEvent, setClickedEvent] = useState<Record<string, any> | null>(
    null
  );

  const { data, isSuccess } = useQuery<any[]>(endpoints.getSchedulers);

  useEffect(() => {
    if (isSuccess) {
      setEvents(
        data?.map((item) => {
          return {
            id: item._id,
            title: `${item.title}-(${item.doctor.firstName} ${item.doctor.lastName})`,
            start: item.startDate,
            end: item.endDate,
            doctor: item.doctor._id,
            status: item.status,
            backgroundColor: eventColor(item.status),
          };
        })
      );
    }
  }, [isSuccess, JSON.stringify(data)]);

  const eventClick = (event: any) => {
    const eventId = event.event.id;
    const selectedEvent = events.find((e) => e.id === eventId);
    const initialEvent = data?.find((e) => e._id === eventId);

    if (selectedEvent)
      setClickedEvent({
        ...selectedEvent,
        title: initialEvent.title,
        startDate: dayjs(selectedEvent.start).toDate(),
        endDate: dayjs(selectedEvent.end).toDate(),
      });
  };

  const closeEventModal = () => {
    setOpenEventModal(false);
    setClickedEvent(null);
  };

  return (
    <RightContent>
      <Box
        sx={(theme) => ({
          border: `1px solid ${theme.colors.gray[8]}`,
          borderRadius: theme.radius.md,
          padding: '10px',
        })}
      >
        <Fullcalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={'timeGridDay'}
          headerToolbar={{
            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'addEvent dayGridMonth,timeGridWeek,timeGridDay,listWeek', // will normally be on the right. if RTL, will be on the left
          }}
          height={'90vh'}
          eventClick={eventClick}
          nowIndicator
          events={events}
          allDaySlot={false}
          customButtons={{
            addEvent: {
              text: 'Add',
              click: function () {
                setOpenEventModal(true);
              },
            },
          }}
          eventMaxStack={3}
          // slotEventOverlap={false}
          slotLabelFormat={[
            {
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: true,
              meridiem: 'short',
              hour12: false,
            },
          ]}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
            hour12: false,
          }}
        />
        <AddEvent
          title={clickedEvent ? 'Update Event' : 'Add Event'}
          opened={clickedEvent ? !!clickedEvent : openEventModal}
          onClose={closeEventModal}
          selectedEvent={clickedEvent as ISchedule}
        />
      </Box>
    </RightContent>
  );
}

export default Schedule;
