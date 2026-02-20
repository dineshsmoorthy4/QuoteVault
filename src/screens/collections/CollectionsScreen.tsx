import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchCollections,
  createCollection,
} from '../../store/slices/collectionsSlice';
import { Header, Button, Input, Loading, EmptyState, Card } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { Collection } from '../../types';

interface CollectionsScreenProps {
  navigation: any;
}

export const CollectionsScreen: React.FC<CollectionsScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { collections, isLoading } = useAppSelector(
    (state) => state.collections
  );
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [creating, setCreating] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(fetchCollections(user.id));
      }
    }, [user, dispatch])
  );

  const handleCreateCollection = useCallback(async () => {
    if (!user || !collectionName.trim()) return;

    try {
      setCreating(true);
      await dispatch(
        createCollection({
          userId: user.id,
          name: collectionName.trim(),
          description: collectionDescription.trim(),
        })
      ).unwrap();

      setCollectionName('');
      setCollectionDescription('');
      setCreateModalVisible(false);
    } catch (error) {
      console.error('Create collection error:', error);
    } finally {
      setCreating(false);
    }
  }, [user, collectionName, collectionDescription, dispatch]);

  const handleSelectCollection = (collection: Collection) => {
    navigation.navigate('CollectionDetail', { collectionId: collection.id });
  };

  if (isLoading && collections.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="My Collections"
        rightIcon="plus"
        onRightPress={() => setCreateModalVisible(true)}
      />

      <View style={styles.content}>
        <FlatList
          data={collections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCollection(item)}>
              <Card style={{ ...styles.collectionCard, borderColor: colors.border }}>
                <View style={styles.collectionHeader}>
                  <View style={styles.collectionInfo}>
                    <Text style={[styles.collectionName, { color: colors.text }]}>
                      {item.name}
                    </Text>
                    {item.description && (
                      <Text
                        style={[
                          styles.collectionDescription,
                          { color: colors.textSecondary },
                        ]}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <Icon
                    name="chevron-right"
                    size={24}
                    color={colors.textSecondary}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title="No collections yet"
                description="Create a collection to organize your favorite quotes"
                icon="folder"
                actionTitle="Create Collection"
                onAction={() => setCreateModalVisible(true)}
              />
            ) : null
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Modal
        visible={createModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <SafeAreaView
          style={[styles.modal, { backgroundColor: colors.background }]}
        >
          <Header
            title="Create Collection"
            leftIcon="x"
            onLeftPress={() => setCreateModalVisible(false)}
          />

          <View style={styles.modalContent}>
            <Input
              label="Collection Name"
              placeholder="Enter collection name"
              value={collectionName}
              onChangeText={setCollectionName}
              editable={!creating}
              testID="collection-name-input"
            />

            <Input
              label="Description (Optional)"
              placeholder="Enter collection description"
              value={collectionDescription}
              onChangeText={setCollectionDescription}
              multiline
              numberOfLines={4}
              editable={!creating}
              testID="collection-description-input"
              containerStyle={styles.descriptionInput}
            />

            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setCreateModalVisible(false)}
                disabled={creating}
                size="lg"
                style={styles.cancelButton}
              />
              <Button
                title={creating ? 'Creating...' : 'Create'}
                onPress={handleCreateCollection}
                loading={creating}
                disabled={creating || !collectionName.trim()}
                size="lg"
                style={styles.createButton}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  collectionCard: {
    marginBottom: SPACING.md,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  collectionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  descriptionInput: {
    marginTop: SPACING.lg,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  cancelButton: {
    flex: 1,
  },
  createButton: {
    flex: 1,
  },
});
