import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { colors, height } from '../style/globalStyle';

export default function MonthCalendar({selectDate, setSelectDate, lunar, changeMonth, restDate, schedule}) {
    const [mark, setMark] = useState({});

    useEffect(() => {
        const mergedSchedule = {
            ...schedule
        }

        Object.entries(restDate).forEach(([date, { marked, periods, rest }]) => {
            if (mergedSchedule[date]) {
            // 같은 날짜가 존재하면 periods와 rest 합치기
            mergedSchedule[date].periods = [...mergedSchedule[date].periods, ...periods];
            mergedSchedule[date].rest = {rest};
            } else {
            // 같은 날짜가 없으면 새로운 날짜로 추가
            mergedSchedule[date] = {marked, periods: [...periods], rest: {rest}};
            }
        });

        setMark(mergedSchedule);
    }, [restDate, schedule]);

    return (
        <Calendar
            enableSwipeMonths={true} // 스와이프로 달 이동
            hideArrows={true} // 달 이동 화살표 숨김
            showSixWeeks={true} // 항상 6주 표시
            monthFormat='M월' // 월 표시 양식
            initialDate={selectDate} // 처음에 표시될 달
            markedDates={{ // 일정이나 선택을 표시할 날짜
                ...mark,
                [selectDate]: {
                    selected: true,
                    lunar: {date: lunar.date, leap: lunar.leap},
                    marked: mark[selectDate]?.marked,
                    rest: mark[selectDate]?.rest,
                    periods: mark[selectDate]?.periods}
            }} 
            markingType='multi-period' // 일정 표시 방식
            onDayPress={date => { // 날짜 클릭시 호출
                setSelectDate(date.dateString);
            }}
            onMonthChange={date => { // 달 변경시 호출
                changeMonth(date.dateString);
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
                    ...customStyle
                }
            }}
        />
    );
}

const customStyle = {
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
                width: '100%',
                borderColor: '#ffffff00',
                borderWidth: 1,
            },
            base: {
                width: 16,
                height: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2
            },
            selected: {
                backgroundColor: '#ffffff00',
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
            },
            lunarText: {
                fontSize: 8,
                color: colors.text,
                height: 10 * height
            }
        }
    },
    marking: {
        period: {
            minHeight: 15 * height,
            marginVertical: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: '2%'
        },
        startingDay: {
            borderTopLeftRadius: 2 * height,
            borderBottomLeftRadius: 2 * height
        },
        endingDay: {
            borderTopRightRadius: 2 * height,
            borderBottomRightRadius: 2 * height
        },
        text: {
            fontSize: 9,
            color: 'white',
            paddingVertical: 1
        }
    }
}