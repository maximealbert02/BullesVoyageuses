import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="maps">
        <Icon sf="map" drawable="custom_settings_drawable" />
        <Label>Maps</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="trip">
        <Icon sf="list.bullet" drawable="custom_settings_drawable" />
        <Label>Trip</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="support">
        <Icon sf="questionmark.circle" drawable="custom_settings_drawable" />
        <Label>Support</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <Icon sf="person.crop.circle" drawable="custom_settings_drawable" />
        <Label>Account</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
