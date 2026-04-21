import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import { DiaryColors } from "@/constants/Colors";

interface CalenderPickerProps {
    date: Date;
    showPicker: boolean;
    setShowPicker: (showPicker: boolean) => void;
    onChange: (event: any, selectedDate?: Date) => void;
}

export default function CalenderPicker({ date, showPicker, setShowPicker, onChange }: CalenderPickerProps) {
    return (
        <View style={styles.section}>
            <View style={styles.calendarHeader}>
                <View>
                    <Text style={styles.timelineLabel}>TIMELINE</Text>
                    <Text style={styles.monthTitle}>
                        {date.toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}
                    </Text>
                </View>
                <TouchableOpacity style={styles.dateSelectorButton} onPress={() => setShowPicker(true)}>
                    <MaterialIcons name="calendar-today" size={20} color={DiaryColors.surfaceContainerLowest} />
                    <Text style={styles.dateSelectorText}>Pick Date</Text>
                </TouchableOpacity>
            </View>


            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 40,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    timelineLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: DiaryColors.text,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    monthTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: DiaryColors.text,
        letterSpacing: -0.5,
    },
    dateSelectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: DiaryColors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    dateSelectorText: {
        color: DiaryColors.surfaceContainerLowest,
        fontSize: 14,
        fontWeight: '600',
    },
})