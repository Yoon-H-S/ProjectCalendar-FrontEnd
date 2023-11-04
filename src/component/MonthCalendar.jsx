import { Calendar } from 'react-native-calendars';
import { colors, height } from '../style/globalStyle';

export default function MonthCalendar({selectDate, setSelectDate, showDate, setShowDate}) {
    return (
        <Calendar
            enableSwipeMonths={true} // 스와이프로 달 이동
            hideArrows={true} // 달 이동 화살표 숨김
            showSixWeeks={true} // 항상 6주 표시
            monthFormat='M월' // 월 표시 양식
            initialDate={showDate} // 처음에 표시될 달
            markedDates={{ // 일정이나 선택을 표시할 날짜
                [selectDate]: {selected: true}
            }}
            markingType='multi-period' // 일정 표시 방식
            onDayPress={date => { // 날짜 클릭시 호출
                setSelectDate(date.dateString);
            }}
            onMonthChange={date => { // 달 변경시 호출
                setShowDate(date.dateString);
            }}
            theme={{
                // header
                textSectionTitleColor: colors.text,
                // month
                textMonthFontSize: 18,
                textMonthFontWeight: 'bold',
                weekVerticalMargin: 0,
                // day
                dayTextColor: colors.text,
                textDayFontSize: 13,
                textDayFontWeight: 600,
                textDayStyle: {
                    marginTop: 0
                },
                // customStyle
                stylesheet: {
                    calendar: {
                        header: {
                            header: {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingRight: 10,
                                alignItems: 'center',
                              },
                            week: {
                                marginBottom: 10 * height,
                                paddingHorizontal: 16,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderBottomWidth: 0.5,
                                borderBottomColor: colors.line
                            },
                            sunText: {
                                color: colors.sunday
                            },
                            satText: {
                                color: colors.saturday
                            }
                        },
                        main: {
                            container: {
                                backgroundColor: 'white'
                            },
                            monthView: {
                                paddingHorizontal: 16,
                                backgroundColor: 'white'
                            },
                            dayContainer: {
                                flex: 1,
                                alignItems: 'center',
                                height: 90 * height
                            }
                        }
                    },
                    day: {
                        basic: {
                            container: {
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                flex: 1,
                                width: '100%'
                            },
                            base: {
                                width: 20,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 2
                            },
                            selected: {
                                backgroundColor: 'white',
                                borderColor: colors.primary,
                                borderRadius: 5,
                                borderWidth: 1,
                            },
                            today: {
                                backgroundColor: colors.secondary,
                                borderRadius: 5
                            },
                            todayText: {
                                color: colors.primary
                            },
                            disabled: {
                                opacity: 0.3
                            },
                            sunText: {
                                color: colors.sunday
                            },
                            satText: {
                                color: colors.saturday
                            }
                        }
                    }
                }
            }}
        />
    );
}