# service-account.py

from oauth2client.service_account import ServiceAccountCredentials

# The scope for the OAuth2 request.
SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

# The location of the key file with the key data.
KEY_FILEPATH = 'V://Websites//GIS-Netzwerk//service-account.json'

# Defines a method to get an access token from the ServiceAccount object.
access_token = ServiceAccountCredentials.from_json_keyfile_name(
        KEY_FILEPATH, SCOPE).get_access_token().access_token

print(access_token)
sys.stdout.flush()