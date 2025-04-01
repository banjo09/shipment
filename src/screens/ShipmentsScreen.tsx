import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckIcon from '../utils/CheckIcon';
import FilterModal from '../components/FilterModal';
import { getShipmentList, getShipmentStatusList } from '../utils/apiService';
// barcode-scan MaterialCommunityIcons
// arrows-expand Foundation
// Feather search
// arrowsalt AntDesign

type ShipmentItem = {
  id: string;
  awb: string;
  route: string;
  status: 'RECEIVED' | 'CANCELED' | 'DELIVERED' | 'ERROR' | 'REJECTED' | 'LOST' | 'ON_HOLD';
  marked: boolean;
  expanded: boolean;
  origin: {
    address: string;
    street: string;
  };
  destination: {
    address: string;
    street: string;
  };
};

const ShipmentsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiError, setApiError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [shipments, setShipments] = useState<ShipmentItem[]>([
    {
      id: '1',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'RECEIVED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '2',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'CANCELED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '3',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'RECEIVED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '4',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'RECEIVED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '5',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'CANCELED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '6',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'ERROR',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
    {
      id: '7',
      awb: '41785691423',
      route: 'Cairo → Alexandria',
      status: 'DELIVERED',
      marked: false,
      expanded: false,
      origin: {
        address: 'Cairo',
        street: 'Dokki, 22 Nile St.'
      },
      destination: {
        address: 'Alexandria',
        street: 'Smoha, 22 max St.'
      }
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statusList, shipments] = await Promise.all([
          getShipmentStatusList(),
          getShipmentList(searchText),
        ]);

        // Transform API data to match your UI structure
        const transformedShipments = shipments.data.map((item: any) => ({
          id: item.name,
          awb: item.awb_number,
          route: `${item.origin} → ${item.destination}`,
          status: item.status,
          marked: false,
          expanded: false,
          origin: {
            address: item.origin,
            street: item.origin_address,
          },
          destination: {
            address: item.destination,
            street: item.destination_address,
          },
        }));

        setShipments(transformedShipments);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiError('Failed to load shipments. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await getShipmentList(searchText);
          // Update state with search results
        } catch (error) {
          console.error('Search error:', error);
        }
      };

      if (searchText.trim()) {
        fetchSearchResults();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const [statusList, shipments] = await Promise.all([
        getShipmentStatusList(),
        getShipmentList(searchText),
      ]);

      const transformedShipments = shipments.data.map((item: any) => ({
        id: item.name,
        awb: item.awb_number,
        route: `${item.origin} → ${item.destination}`,
        status: item.status,
        marked: false,
        expanded: false,
        origin: {
          address: item.origin,
          street: item.origin_address,
        },
        destination: {
          address: item.destination,
          street: item.destination_address,
        },
      }));

      setShipments(transformedShipments);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setApiError('Failed to refresh shipments. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const toggleMark = (id: string) => {
    setShipments(shipments.map(item =>
      item.id === id ? { ...item, marked: !item.marked } : item
    ));
  };

  const markAll = () => {
    const allMarked = shipments.every(item => item.marked);
    setShipments(shipments.map(item => ({ ...item, marked: !allMarked })));
  };

  const toggleExpansion = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const applyFilters = (newFilters: string[]) => {
    setSelectedFilters(newFilters);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECEIVED': return ['#2F50C1', '#D9E6FD'];
      case 'CANCELED': return ['#58536E', '#F4F2F8'];
      case 'DELIVERED': return ['#208D28', '#E3FAD6'];
      case 'ERROR': return ['#D12030', '#FEE3D4'];
      case 'ON_HOLD': return ['#FFF3D5', '#DB7E21'];
      default: return ['#208D28', 'E3FAD6'];
    }
  };

  const filteredShipments = shipments.filter(item => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch = item.awb.toLowerCase().includes(searchLower) ||
      item.route.toLowerCase().includes(searchLower);
    const matchesStatus = selectedFilters.length === 0 ||
      selectedFilters.includes(item.status);
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2F50C1" />
      </View>
    );
  }

  if (apiError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{apiError}</Text>
        <TouchableOpacity onPress={() => setApiError('')}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../assets/images/shippex.png')}
            style={styles.logoImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circularBackground}>
          <Ionicons name="notifications-outline" size={24} color="#2F50C1" />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>Ibrahim Shaker</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        {/* <Icon name="search" size={20} color="#999" style={styles.searchIcon} /> */}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="filter-list" size={20} color='rgba(0, 0, 0, 0.6)' />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addScanButton}>
          <FontAwesome name="qrcode" size={20} color="#FFF" />
          <MaterialCommunityIcons name="line-scan" size={20} color="#FFF" />
          <Text style={styles.addScanButtonText}>Add Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.shipmentsHeader}>
        <Text style={styles.shipmentsTitle}>Shipments</Text>
        <TouchableOpacity style={styles.markAllContainer} onPress={markAll}>
          <Icon
            name={shipments.every(item => item.marked) ? 'check-box' : 'check-box-outline-blank'}
            size={24}
            color={shipments.every(item => item.marked) ? '#2F50C1' : '#D0D5DD'}
          />
          <Text style={styles.markAllText}>Mark All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredShipments}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#2F50C1']}
            tintColor="#2F50C1"
          />
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.shipmentItemContainer,
              item.marked && {
                borderColor: '#6E91EC',
                borderWidth: 2,
                borderRadius: 10,
              }
            ]}
          >
            <View
              style={[
                styles.shipmentItem,
                expandedItems.has(item.id) && styles.boxExpanded
              ]}
            >
              <TouchableOpacity
              // onPress={() => toggleMark(item.id)}
              >
                {/* <Icon
                  name={item.marked ? 'check-box' : 'check-box-outline-blank'}
                  size={24}
                  color={item.marked ? '#D9E6FD' : '#D0D5DD'}
                /> */}
                <CheckIcon
                  isChecked={item.marked}
                  isToggle={expandedItems.has(item.id)}
                  size={20}
                  onPress={() => toggleMark(item.id)}
                />
              </TouchableOpacity>

              <Image
                source={require('../assets/images/boxItem.png')}
                style={styles.shipmentImage}
              />

              <View style={styles.shipmentInfo}>
                <Text style={styles.awbText}>AWB {item.awb}</Text>
                <Text style={styles.routeText}>{item.route}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status)[1] }
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status)[0] }
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleExpansion(item.id)}
                style={styles.expandButton}
              >
                <Icon
                  // name="more-vert"
                  // name={expandedItems.has(item.id) ? 'arrows-compress' : 'arrows-expand'}
                  name={expandedItems.has(item.id) ? 'arrow-upward' : 'arrow-downward'}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {expandedItems.has(item.id) && (
              <View style={styles.expandedContent}>
                <View style={styles.dashedLine} />
                <View style={styles.addressRow}>
                  <View style={styles.addressContainer}>
                    <Text style={styles.addressLabel}>Origin</Text>
                    <Text style={styles.addressText}>{item.origin.address}</Text>
                    <Text style={styles.streetText}>{item.origin.street}</Text>
                  </View>
                  <Icon
                    name='arrow-forward'
                    size={24}
                    color='#2F50C1'
                  />

                  <View
                    style={[
                      styles.addressContainer,
                      { paddingLeft: '7%' }
                    ]}
                  >
                    <Text style={styles.addressLabel}>Destination</Text>
                    <Text style={styles.addressText}>{item.destination.address}</Text>
                    <Text style={styles.streetText}>{item.destination.street}</Text>
                  </View>
                </View>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => console.log('Call pressed')}
                  >
                    <Icon name="call" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Call</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                    style={styles.whatsappButton}
                    onPress={() => console.log('WhatsApp pressed')}
                  >
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      />
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={applyFilters}
          initialSelectedFilters={selectedFilters}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  circularBackground: {
    backgroundColor: '#F4F2F8',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoImage: {
    width: 128,
    height: 15,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F50C1',
  },
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  name: {
    fontSize: 28,
    // fontWeight: 'bold',
    fontWeight: '600',
    color: '#000000',
    marginTop: 5,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: '#F4F2F8',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F4F2F8',
  },
  searchInput: {
    padding: 15,
    paddingLeft: 45,
    fontSize: 16,
    color: '#000000',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F2F8',
    borderWidth: 1,
    borderColor: '#F4F2F8',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '48%',
  },
  filterButtonText: {
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: 8,
    fontWeight: '500',
  },
  addScanButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F50C1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '48%',
  },
  addScanButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  markAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shipmentItemContainer: {
    marginBottom: 8,
  },
  shipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F2F8',
    // backgroundColor: 'orange',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  boxExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  shipmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  shipmentsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  markAllText: {
    color: '#2F50C1',
    fontWeight: '500',
    marginLeft: 5,
  },
  shipmentImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  shipmentInfo: {
    flex: 1,
  },
  awbText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
    lineHeight: 20,
  },
  routeText: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginHorizontal: 10,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  dashedLine: {
    width: "100%",
    height: 1,
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "dashed",
  },

  expandButton: {
    marginLeft: 10,
  },
  expandedContent: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(244, 242, 248, 0.5)',
    // backgroundColor: 'pink',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  addressContainer: {
    width: '46%',
  },
  addressLabel: {
    fontSize: 11,
    color: '#2F50C1',
    marginBottom: 5,
  },

  addressText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 5,
  },
  streetText: {
    fontSize: 13,
    color: '#666',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    gap: 14,
    marginRight: 15,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6E91EC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '32%',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '40%',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '500',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D12030',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    color: '#2F50C1',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShipmentsScreen;