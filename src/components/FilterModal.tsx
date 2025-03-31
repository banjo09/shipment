import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FilterModalProps = {
  // visible: boolean;
  // onClose: () => void;
  // onApply: () => void;
  // selectedFilters: string[];
  // toggleFilter: (filter: string) => void;

  visible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: string[]) => void;  // Updated to accept filters
  initialSelectedFilters: string[];  // New prop for initial state

};

const FilterModal = ({
  // onClose,
  // onApply,
  // selectedFilters,
  // toggleFilter,


  visible,
  onClose,
  onApply,
  initialSelectedFilters,
}: FilterModalProps) => {
  const [tempSelectedFilters, setTempSelectedFilters] = React.useState<string[]>(initialSelectedFilters);

  const handleToggleFilter = (filter: string) => {
    setTempSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleApply = () => {
    onApply(tempSelectedFilters);  // Pass the selected filters to parent
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Filters</Text>

          <TouchableOpacity onPress={handleApply}>
            <Text style={styles.modalDoneText}>Done</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.filterSectionTitle}>SHIPMENT STATUS</Text>

        <View style={styles.filterOptions}>
          {['RECEIVED', 'PUTAWAY', 'DELIVERED', 'CANCELED', 'REJECTED', 'LOST', 'ON_HOLD'].map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterOption,
                tempSelectedFilters?.includes(status) && styles.filterOptionSelected
              ]}
              // onPress={() => toggleFilter(status)}
              onPress={() => handleToggleFilter(status)}
            >
              <Text style={[
                styles.filterOptionText,
                tempSelectedFilters?.includes(status) && styles.filterOptionTextSelected
              ]}>
                {
                  status == 'ON_HOLD' ?
                    'On Hold' :
                    status.charAt(0) + status.slice(1).toLowerCase()
                }
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   backgroundColor: 'rgba(0,0,0,0.5)',
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  // modalContent: {
  //   backgroundColor: '#FFF',
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  //   padding: 20,
  //   maxHeight: '70%',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },
  // modalHeader: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  // modalCancelText: {
  //   color: '#666',
  //   fontSize: 16,
  // },
  // modalTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: '#333',
  // },
  // modalDoneText: {
  //   color: '#2F50C1',
  //   fontSize: 16,
  //   fontWeight: '500',
  // },
  // filterSectionTitle: {
  //   color: '#999',
  //   fontSize: 14,
  //   marginBottom: 15,
  //   fontWeight: '500',
  // },
  // filterOptions: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  // filterOption: {
  //   borderWidth: 1,
  //   borderColor: '#DDD',
  //   borderRadius: 20,
  //   paddingVertical: 8,
  //   paddingHorizontal: 15,
  //   marginRight: 10,
  //   marginBottom: 10,
  // },
  // filterOptionSelected: {
  //   borderColor: '#2F50C1',
  //   backgroundColor: '#F0EEFF',
  // },
  // filterOptionText: {
  //   color: '#666',
  // },
  // filterOptionTextSelected: {
  //   color: '#2F50C1',
  // },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalCancelText: {
    color: '#2F50C1',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalDoneText: {
    color: '#2F50C1',
    fontSize: 16,
    fontWeight: '500',
  },
  filterSectionTitle: {
    color: '#58536E',
    fontSize: 14,
    marginBottom: 15,
    fontWeight: '500',
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 50,
  },
  filterOption: {
    borderRadius: 10,
    backgroundColor: '#F4F2F8',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  filterOptionSelected: {
    borderWidth: 1,
    borderColor: '#6E91EC',
  },
  filterOptionText: {
    color: '#58536E',
  },
  filterOptionTextSelected: {
    color: '#2F50C1',
  },
});

export default FilterModal;