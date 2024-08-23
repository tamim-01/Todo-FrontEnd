import ProfileHeader from '../components/profileHeader.jsx';
import { EditProfileForm } from '../components/editProfileForm.jsx';
import { useNavigate, useNavigation } from 'react-router-dom';
const ProfilePage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-w-[320px]">
            <ProfileHeader />
            <div className="max-w-7xl mx-auto mb-28 px-4 sm:px-6 md:px-8 lg:px-16">
                
                   
                        <div className='flex flex-row justify-between'>  <h2 className="text-2xl text-center md:text-left md:ml-12 font-semibold mb-6">Edit your profile</h2>
                   </div>
                      
                        <EditProfileForm />
                    
                
            </div>
        </div>
    );
};

export default ProfilePage;
