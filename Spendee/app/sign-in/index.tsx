import { SocialConnections } from '@/components/social-connections'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'
import { auth } from '@/firebase.config'
import userService from '@/services/user.service'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import * as React from 'react'
import { useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  type TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

export default function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { isOAuthFlow } = useGlobalSearchParams()

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus()
  }

  async function onSubmit() {
    setLoading(true)
    await userService.login(auth, email, password, Boolean(isOAuthFlow))
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          className="flex-1"
          contentContainerClassName="flex-grow justify-center items-center p-6"
        >
          <View className="gap-6 w-full h-full justify-center bg-background">
            <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 bg-background">
              <CardHeader>
                <CardTitle
                  className="text-center text-2xl sm:text-left"
                  testID="loginTitle"
                >
                  Bienvenido a Spendee!
                </CardTitle>
                <CardDescription className=" text-center sm:text-left">
                  Iniciá sesión para continuar
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-6">
                <View className="gap-6">
                  <View className="gap-1.5">
                    <Label htmlFor="email">Usuario</Label>
                    <Input
                      id="email"
                      placeholder="mail@example.com"
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      onSubmitEditing={onEmailSubmitEditing}
                      returnKeyType="next"
                      submitBehavior="submit"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  <View className="gap-1.5">
                    <View className="flex-row items-center">
                      <Label htmlFor="password">Contraseña</Label>
                      {!isOAuthFlow && (
                        <Button
                          variant="link"
                          size="sm"
                          className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                          onPress={() => {
                            router.push('/sign-in/forgot-password')
                          }}
                        >
                          <Text className="font-normal leading-4">
                            Olvidé mi contraseña
                          </Text>
                        </Button>
                      )}
                    </View>
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={onSubmit}
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <Button
                    disabled={loading}
                    className="w-full"
                    onPress={onSubmit}
                  >
                    {loading ? (
                      <ActivityIndicator color="#000000" />
                    ) : (
                      <Text>Continuar</Text>
                    )}
                  </Button>
                  {!isOAuthFlow && (
                    <View className="flex-row items-center justify-center">
                      <Text className="text-sm">¿No tenés cuenta? </Text>
                      <Pressable
                        onPress={() => {
                          router.replace('/sign-up')
                        }}
                      >
                        <Text className="text-sm underline underline-offset-4">
                          Registrate
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
                {/* <View className="mt-2 gap-4">
                  <View className="flex-row items-center justify-center gap-3">
                    <Separator className="flex-1" />
                    <Text className="text-muted-foreground text-sm">o</Text>
                    <Separator className="flex-1" />
                  </View>
                  <SocialConnections />
                </View> */}
              </CardContent>
            </Card>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
